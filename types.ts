
export type ProgrammingLanguage = 'python' | 'java' | 'cpp' | 'c' | 'javascript' | 'auto';

export interface ExplanationOutput {
  title: string;
  algorithmType: string;
  bigPictureStory: string;
  whyThisExists: string;
  realWorldAnalogy: {
    scenario: string;
    mapping: { codePart: string; analogyPart: string }[];
  };
  stepByStepStory: {
    step: number;
    description: string;
  }[];
  gentleTechnicalTranslation: string;
  ifThisBreaks: string;
  commonMistakes: string[];
  improvementIdeas: string[];
}

export interface ExplanationState {
  loading: boolean;
  error: string | null;
  result: ExplanationOutput | null;
}
