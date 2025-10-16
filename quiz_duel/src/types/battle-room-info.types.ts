export interface RoomInfo {
  title: string;
  category: string[];
  level: string;
  quizCount: string;
  timeLimit: string;
  users: string[];
  quizIds: string[];
  currentIndex: number;
  status: "WAITING" | "PLAYING" | "FINISHED";
}
