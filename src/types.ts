/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ModuleState {
  HOME = 'HOME',
  LOADING = 'LOADING',
  LEARNING = 'LEARNING',
  QUIZ = 'QUIZ',
  SANDBOX = 'SANDBOX',
  COMPLETE = 'COMPLETE'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LessonSection {
  heading: string;
  content: string;
  visualPrompt: string;
  videoUrl?: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  sections: LessonSection[];
  quiz: QuizQuestion[];
  summary: string;
}

export const TOPICS = [
  { id: 'voter-registration', title: 'Phase 1: Voter Registration', detail: 'Form 6, Form 8, and Verification' },
  { id: 'nomination-scrutiny', title: 'Phase 2: Nomination & Scrutiny', detail: 'Candidate eligibility and withdrawals' },
  { id: 'campaign-ethics', title: 'Phase 3: Model Code of Conduct', detail: 'Ethical campaigning and social media rules' },
  { id: 'voter-turnout', title: 'Phase 4: Polling Day', detail: 'EVMs, VVPATs, and the voting process' },
  { id: 'counting-results', title: 'Phase 5: Counting & Result', detail: 'The tallying process and declaration' },
];
