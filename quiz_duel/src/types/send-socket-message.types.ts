export type SendSocketMessage =
  | {
      type: "create";
      title: string;
      quizCount: number;
      level: string;
      category: string[];
      timeLimit: number;
    }
  | { type: "join"; userId: string; roomCode: string }
  | {
      type: "ready_status";
      roomCode: string;
      userId: string;
      isReady: boolean;
    }
  | { type: "exit" };
