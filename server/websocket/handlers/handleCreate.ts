import { ExtendedWebSocket } from "../../types/extended-websocket.type";
import { generateRoomCode } from "../../util/generateRoomCode";
import saveRoom from "../../lib/saveRoom";
import { SocketMessage } from "../../types/socket-message.type";

export default async function handleCreate(
  ws: ExtendedWebSocket,
  data: Extract<SocketMessage, { type: "create" }>
) {
  const { title, quizCount, level, category, timeLimit, status } = data;
  const roomCode = await generateRoomCode();

  await saveRoom({
    roomCode,
    title,
    quizCount,
    level,
    category,
    timeLimit,
    users: [],
    status,
  });

  ws.send(
    JSON.stringify({
      type: "room_create_success",
      message: "방을 성공적으로 생성했습니다.",
      roomCode: roomCode,
    })
  );
}
