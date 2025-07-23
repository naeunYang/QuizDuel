export type SocketMessage =
  | { type: "create" }
  | { type: "join"; userId: string; roomCode: string }
  | {
      type: "ready_status";
      roomCode: string;
      userId: string;
      isReady: boolean;
    };
