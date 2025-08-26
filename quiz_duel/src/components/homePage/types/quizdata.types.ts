export interface QuizData {
  isChecked: boolean;
  id: string;
  type?: { typeID: string; typeName: string };
  categoryID: string;
  levelID: string;
  status?: { statusID: string; statusName: string };
  content: string;
  explanation: string;
  answer: string;
  choices: string | null;
}
