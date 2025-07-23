import { ExtendedWebSocket } from "../../types/extended-websocket.type";
import { SocketMessage } from "./../../types/socket-message.type";
import getRoom from "../../lib/getRoom";

export default async function handleReadyState(
  ws: ExtendedWebSocket,
  data: Extract<SocketMessage, { type: "ready_status" }>
) {
  const { roomCode, userId, isReady } = data;

  const users = await getRoom(roomCode);

  if (users.length > 0) {
    users.map((user) => {
      if (user.userId === userId) {
        return { ...user, isReady };
      }
      return user;
    });
  }
}
