export interface Assessment {
  id: string;
  title: string;
  description: string;
  sections: AssessmentSection[];
  totalQuestions: number;
  estimatedTime: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  weight: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'likert-scale' | 'scenario' | 'ranking';
  question: string;
  options?: Option[];
  scaleRange?: { min: number; max: number; minLabel: string; maxLabel: string };
  correctAnswer?: string | number;
  category: string;
  weight: number;
}

export interface Option {
  id: string;
  text: string;
  value: number | string;
}

export interface UserResponse {
  questionId: string;
  answer: string | number | string[];
  timeSpent: number;
}

export interface SectionScore {
  sectionId: string;
  sectionTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
  insights: string[];
}

export interface AssessmentResult {
  userId: string;
  assessmentId: string;
  overallScore: number;
  sectionScores: SectionScore[];
  wiscarScores: WISCARScores;
  recommendation: AssessmentRecommendation;
  completedAt: Date;
  timeSpent: number;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitiveReadiness: number;
  abilityToLearn: number;
  realWorldAlignment: number;
  overall: number;
}

export interface AssessmentRecommendation {
  decision: 'yes' | 'maybe' | 'no';
  confidence: number;
  reasoning: string;
  nextSteps: string[];
  alternativePaths?: string[];
  learningResources: LearningResource[];
}

export interface LearningResource {
  title: string;
  type: 'course' | 'certification' | 'book' | 'project' | 'practice';
  url?: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface AssessmentProgress {
  currentSection: number;
  currentQuestion: number;
  totalQuestions: number;
  completedQuestions: number;
  percentage: number;
  timeSpent: number;
}