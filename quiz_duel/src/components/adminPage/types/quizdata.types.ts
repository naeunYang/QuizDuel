export interface QuizData {
  isChecked?: boolean;
  id: string;
  type: string;
  categoryID: string;
  levelID: string;
  status: string;
  content: string;
  explanation: string;
  answer: string;
  choices: string[] | null;
}
