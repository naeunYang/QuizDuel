import { ExtendedWebSocket } from "../../types/extended-websocket.type";
import { generateRoomCode } from "../../util/generateRoomCode";
import saveRoom from "../../lib/saveRoom";

export default async function handleCreate(ws: ExtendedWebSocket) {
  const roomCode = await generateRoomCode();
  await saveRoom({ roomCode: roomCode, users: [] });

  ws.send(
    JSON.stringify({
      type: "room_create_success",
      message: "방을 성공적으로 생성했습니다.",
      roomCode: roomCode,
    })
  );
}
