export type ReceiveSocketMessage =
  | { type: "room_create_success"; message: string; roomCode: string }
  | { type: "room_not_found"; message: string }
  | { type: "room_full"; message: string }
  | { type: "all_users_joined"; connCompleted: boolean; roomCode: string }
  | { type: "all_ready"; isAllReady: boolean }
  | { type: "opponent_ready_state"; isOpponentReady: boolean };
