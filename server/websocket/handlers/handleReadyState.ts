import { ExtendedWebSocket } from "../../types/extended-websocket.type";
import { SocketMessage } from "./../../types/socket-message.type";

export default function handleReadyState(
  ws: ExtendedWebSocket,
  data: Extract<SocketMessage, { type: "ready_status" }>
) {
  const { userId, isReady } = data;
}
