export interface QuizData {
  seq: number;
  type: string;
  categoryID: string;
  levelID: string;
  content: string;
  explanation: string;
  answer: string;
  choices: string[];
  check: string;
}
