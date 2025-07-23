import { socketInfo } from "./../socketInfo";
import { ExtendedWebSocket } from "../../types/extended-websocket.type";
import isRoomExists from "../../lib/isRoomExists";
import getRoom from "../../lib/getRoom";
import saveRoom from "../../lib/saveRoom";
import { SocketMessage } from "./../../types/socket-message.type";

export default async function handleJoin(
  ws: ExtendedWebSocket,
  data: Extract<SocketMessage, { type: "join" }> // Extract<T, U> : 타입 T에서 U에 해당하는 부분만 추출
) {
  const { userId, roomCode } = data;

  // 해당하는 방이 없을 경우
  if (!(await isRoomExists(roomCode))) {
    ws.send(
      JSON.stringify({
        type: "room_not_found",
        message: "방을 찾을 수 없습니다.",
      })
    );
    ws.close();
    return;
  }
  // 해당하는 방이 존재할 경우
  else {
    let users = await getRoom(roomCode);

    if (users.length >= 2) {
      ws.send(
        JSON.stringify({
          type: "room_full",
          message: "방이 가득 찼습니다.",
        })
      );
      ws.close();
      return;
    } else {
      // 소켓 객체 저장
      ws.userId = userId;
      ws.roomCode = roomCode;
      socketInfo.set(userId, ws);

      users.push(userId);
      saveRoom({ roomCode: roomCode, users: users });

      users = await getRoom(roomCode);
      console.log(`[${roomCode}] 현재 접속 유저:`, users);

      if (users.length == 2) {
        users.forEach((user: string) => {
          const socket = socketInfo.get(user);
          socket?.send(
            JSON.stringify({
              type: "ready",
              connCompleted: true,
            })
          );
        });
      }
    }
  }
}
