export type SocketMessage =
  | {
      type: "create";
      title: string;
      quizCount: number;
      level: string;
      category: string[];
      timeLimit: number;
      status: "WAITING" | "PLAYING" | "FINISHED";
    }
  | { type: "join"; userId: string; roomCode: string }
  | {
      type: "ready_status";
      roomCode: string;
      userId: string;
      isReady: boolean;
    }
  | { type: "exit" };
