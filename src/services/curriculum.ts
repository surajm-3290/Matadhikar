/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningModule } from "../types";

export const STATIC_CURRICULUM: Record<string, LearningModule> = {
  'Phase 1: Voter Registration': {
    id: 'module-1',
    title: 'Phase 1: Voter Registration',
    description: 'Master the process of getting your name on the official electoral roll.',
    summary: 'You now know how to join the democratic process using Form 6 and Form 8.',
    sections: [
      {
        heading: 'Registration Basics',
        content: 'Before anyone can vote, their name must be on the official electoral roll. The Election Commission of India (ECI) updates this list continuously, but it freezes once an election is announced.',
        visualPrompt: 'A clean, professional interface of an electoral roll document with a "Verified" seal.',
        videoUrl: 'https://www.youtube.com/embed/J9_M1VlQc0g'
      },
      {
        heading: 'Form 6: New Voters',
        content: 'Used by first-time voters (18 years or older) to apply for a new Voter ID and get their name on the list. It requires proof of age and proof of residence.',
        visualPrompt: 'An illustration of a young citizen holding a digital tablet with a registration form icon.'
      },
      {
        heading: 'Form 8: Changes & Shifting',
        content: 'Used if you need to shift your residence to a new constituency, correct mistakes on your current ID, or request a replacement card. It is the versatile form for all modifications.',
        visualPrompt: 'An icon representing moving boxes and a pencil editing a profile card.'
      },
      {
        heading: 'Verification Status',
        content: 'Voters can verify their registration status and find their designated polling booth at any time using the ECI’s Voter Portal or the Voter Helpline App.',
        visualPrompt: 'A smartphone screen displaying a "Voter Verified" checkmark and a map pin for a polling station.'
      }
    ],
    quiz: [
      {
        question: 'Which form is used for a first-time voter registration?',
        options: ['Form 6', 'Form 8', 'Form 10', 'Form 26'],
        correctIndex: 0
      },
      {
        question: 'When does the electoral roll usually freeze?',
        options: ['6 months after election', 'Once an election is announced', 'Never', 'Every Monday'],
        correctIndex: 1
      },
      {
        question: 'What is Form 8 primarily used for?',
        options: ['Candidate nomination', 'Corrections and residence shifting', 'Counting votes', 'Reporting crimes'],
        correctIndex: 1
      }
    ]
  },
  'Phase 2: Nomination & Scrutiny': {
    id: 'module-2',
    title: 'Phase 2: Nomination & Scrutiny',
    description: 'Learn how candidates qualify to represent citizens in the election.',
    summary: 'You understand the rigorous checks candidates undergo before appearing on the ballot.',
    sections: [
      {
        heading: 'Filing Nominations',
        content: 'Anyone meeting constitutional eligibility criteria can submit nomination papers to the Returning Officer (RO). They must also submit an affidavit (Form 26) publicly declaring their assets, liabilities, education, and any criminal history.',
        visualPrompt: 'A formal legal document with a signature line and a gavel representing authority.'
      },
      {
        heading: 'The Scrutiny Phase',
        content: 'The RO strictly examines all submitted documents. Nominations can be rejected for fatal flaws, such as the candidate not meeting the age requirement or being a non-citizen.',
        visualPrompt: 'A magnifying glass over a stack of documents with a "Verified" stamp in the background.'
      },
      {
        heading: 'Withdrawals',
        content: 'After scrutiny, approved candidates are given a short, specific window to legally withdraw their names if they choose not to contest.',
        visualPrompt: 'An architectural drawing of an "Exit" door next to a ballot box.'
      }
    ],
    quiz: [
      {
        question: 'What is contained in the Form 26 affidavit?',
        options: ['Voting preferences', 'Personal assets and criminal history', 'Campaign schedule', 'Voter IDs of supporters'],
        correctIndex: 1
      },
      {
        question: 'Who is responsible for scrutinizing nomination papers?',
        options: ['The Prime Minister', 'The Returning Officer (RO)', 'The Police Commissioner', 'Voters themselves'],
        correctIndex: 1
      }
    ]
  },
  'Phase 3: Model Code of Conduct': {
    id: 'module-3',
    title: 'Phase 3: Model Code of Conduct',
    description: 'The ethical framework that ensures a fair fight for all contestants.',
    summary: 'You understand the rules that maintain integrity during the intense campaign period.',
    sections: [
      {
        heading: 'Fair Play & Government Machinery',
        content: 'The Model Code of Conduct (MCC) comes into effect the moment election dates are announced. The ruling party cannot use government machinery, funds, or official visits to campaign.',
        visualPrompt: 'A balance scale weighing a government building against a campaign megaphone.'
      },
      {
        heading: 'Ethical Campaigning',
        content: 'Politicians are strictly forbidden from appealing to caste or communal sentiments. Places of worship cannot be used as forums for election propaganda.',
        visualPrompt: 'Icons representing different faiths inside a "No Campaigning" restricted circle.'
      },
      {
        heading: 'The Silence Period',
        content: 'Exactly 48 hours before voting concludes, all public campaigning—including rallies, loud-speakers, and political ads—must completely stop.',
        visualPrompt: 'A clock showing 48 hours with a mute icon over a megaphone.'
      }
    ],
    quiz: [
      {
        question: 'When does the Model Code of Conduct (MCC) come into effect?',
        options: ['On polling day', 'When election dates are announced', '1 year before election', 'After the result'],
        correctIndex: 1
      },
      {
        question: 'How long is the "Silence Period" before voting concludes?',
        options: ['12 hours', '24 hours', '48 hours', '1 week'],
        correctIndex: 2
      }
    ]
  },
  'Phase 4: Polling Day': {
    id: 'module-4',
    title: 'Phase 4: Polling Day',
    description: 'The climax of the democratic process where every vote counts.',
    summary: 'You are now ready to navigate the polling booth with confidence.',
    sections: [
      {
        heading: 'Identification & Ink',
        content: 'Inside the booth, a polling officer verifies the voter\'s identity using their Voter ID and marks their index finger with indelible ink to prevent double voting.',
        visualPrompt: 'A close-up of a finger being marked with blue indelible ink.'
      },
      {
        heading: 'The EVM Unit',
        content: 'The voter enters a private voting compartment and presses the blue button next to their chosen candidate’s symbol on the Electronic Voting Machine (EVM).',
        visualPrompt: 'A clean perspective of an EVM unit with tactile blue buttons.'
      },
      {
        heading: 'The 7-Second VVPAT Rule',
        content: 'Instantly, a printed paper slip appears in the transparent window of the VVPAT machine. This displays the candidate\'s name and symbol for exactly 7 seconds before dropping into a sealed box.',
        visualPrompt: 'A VVPAT machine with a glowing transparent window showing a candidate slip.'
      }
    ],
    quiz: [
      {
        question: 'How long does the VVPAT slip stay visible to the voter?',
        options: ['1 second', '7 seconds', '30 seconds', 'Until the next voter comes'],
        correctIndex: 1
      },
      {
        question: 'What is the purpose of indelible ink?',
        options: ['To help counting', 'To prevent double voting', 'For artistic signature', 'To signify party loyalty'],
        correctIndex: 1
      }
    ]
  },
  'Phase 5: Counting & Result': {
    id: 'module-5',
    title: 'Phase 5: Counting & Result',
    description: 'How votes are meticulously tallied and winners declared.',
    summary: 'You understand the transparency and verification steps behind the final result.',
    sections: [
      {
        heading: 'Postal Ballots First',
        content: 'Counting begins with the tabulation of postal ballots (used by service personnel and election staff) under the direct supervision of the RO.',
        visualPrompt: 'An envelope being opened with a "Postal Ballot" label.'
      },
      {
        heading: 'EVM Tabulation',
        content: '30 minutes later, the EVMs are unsealed and the electronic votes are counted sequentially in rounds.',
        visualPrompt: 'A high-tech digital board updating totals as rounds progress.'
      },
      {
        heading: 'VVPAT Matching',
        content: 'Before any final result is declared, the ECI randomly selects 5 polling stations per assembly segment for mandatory physical matching of VVPAT slips with EVM tallies.',
        visualPrompt: 'A side-by-side comparison of a digital screen and physical paper slips.'
      },
      {
        heading: 'Official Declaration',
        content: 'Once all counts are verified, the Returning Officer officially declares the winning candidate for that constituency.',
        visualPrompt: 'A formal "Certificate of Election" being handed over.'
      }
    ],
    quiz: [
      {
        question: 'Which votes are counted first?',
        options: ['EVM votes', 'Postal ballots', 'VVPAT slips', 'Mobile votes'],
        correctIndex: 1
      },
      {
        question: 'How many random polling stations per assembly segment undergo VVPAT matching?',
        options: ['All of them', 'None', '5 stations', '10 stations'],
        correctIndex: 2
      }
    ]
  }
};
