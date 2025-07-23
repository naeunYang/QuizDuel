export type RoomInfo = {
  roomCode: string;
  users: {
    userId: string;
    isReady: boolean;
  }[];
};
