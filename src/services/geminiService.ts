import { GoogleGenAI, Type } from "@google/genai";
import { LearningModule } from "../types";
import { STATIC_CURRICULUM } from "./curriculum";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const BASE_CURRICULUM = `
01 Phase 1: Voter Registration (Form 6, Form 8, and Verification)
Form 6: Used by first-time voters (18 years or older) for new Voter ID.
Form 8: Used for residence shifting, corrections, or replacements.
Verification: Done via Voter Portal or Helpline App.

02 Phase 2: Nomination & Scrutiny (Candidate eligibility and withdrawals)
Filing: Candidates submit Form 26 (assets, liabilities, education, criminal history).
Scrutiny: Returning Officer (RO) rejects flaws (age, citizenship).
Withdrawals: Specific window to legally withdraw.

03 Phase 3: Model Code of Conduct (MCC)
Fair Play: No government funds/machinery for campaigns.
Ethical Campaigning: No appeals to caste/communal sentiments.
Silence Period: 48 hours before voting ends, all campaigning stops.

04 Phase 4: Polling Day (EVMs, VVPATs, and the voting process)
Verification: Polling officer marks finger with indelible ink.
EVM: Voter presses blue button for their candidate.
VVPAT: 7-second rule - slip shows candidate name/symbol before dropping into box.

05 Phase 5: Counting & Result (The tallying process and declaration)
Postal Ballots First: Tabulation overseen by RO.
EVM Tabulation: Sequential rounds.
VVPAT Matching: Mandatory matching for 5 random polling stations.
Declaration: RO declares the winner.
`;

export async function fetchLessonModule(topic: string): Promise<LearningModule> {
  // Use static curriculum if available to bypass potential AI latency/quota issues
  if (STATIC_CURRICULUM[topic]) {
    return STATIC_CURRICULUM[topic];
  }

  const systemInstruction = `
    You are a civic education expert. 
    Use the following BASE CURRICULUM as your absolute source of truth for these topics:
    ${BASE_CURRICULUM}

    Your goal is to turn the relevant parts of this curriculum into an interactive learning module.
    Each module should be structured as a JSON object containing a title, a description, educational sections, and a short quiz. 

    The 'sections' should include a heading, body content (elaborate slightly on the brief curriculum to make it educational), and a 'visualPrompt' for image generation.
    The 'quiz' should consist of 3-4 multiple-choice questions based on the content.

    Tone: Educational, professional, and consistent with ECI (Election Commission) standards.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a comprehensive interactive learning module for the topic: "${topic}". Focus on practical knowledge and important rules.`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                heading: { type: Type.STRING },
                content: { type: Type.STRING },
                visualPrompt: { type: Type.STRING, description: "A detailed prompt for generating a representative illustration for this section." }
              },
              required: ["heading", "content", "visualPrompt"]
            }
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER }
              },
              required: ["question", "options", "correctIndex"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["title", "description", "sections", "quiz", "summary"]
      },
    },
  });

  const raw = response.text;
  if (!raw) throw new Error("Empty response from AI");
  
  const parsed = JSON.parse(raw);
  return {
    ...parsed,
    id: topic.toLowerCase().replace(/\s+/g, '-'),
  };
}

export function createChatSession() {
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `
        You are "Matadhikar Sahayak", a helpful and knowledgeable assistant for Indian Election Process education.
        Your goal is to answer student questions about the election process, voting rights, ECI guidelines, EVMs, VVPATs, and civic duties.
        
        Source of Truth for your base knowledge:
        ${BASE_CURRICULUM}
        
        Guidelines:
        1. Keep answers factual, neutral, and consistent with the Election Commission of India (ECI) standards.
        2. If asked about political opinions or candidates, politely decline and steer the conversation back to the educational process.
        3. Explain technical terms simply.
        4. Be encouraging and promote civic participation.
        5. Keep responses concise and easy to read.
      `,
    },
  });
}
