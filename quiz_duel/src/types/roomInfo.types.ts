import type { QuizCount, Level, Category, TimeLimit } from "@/data/mockData";

export interface RoomInfo {
  code: string;
  title: string;
  quizCount: QuizCount;
  level: Level;
  category: Category[];
  timeLimit: TimeLimit;
}
