export type RoomInfo = {
  roomCode: string;
  title?: string;
  quizCount?: number;
  level?: string;
  category?: string[];
  timeLimit?: number;
  users: {
    userId: string;
    isReady: boolean;
  }[];
};
