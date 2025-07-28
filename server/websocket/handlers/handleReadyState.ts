import { ExtendedWebSocket } from "../../types/extended-websocket.type";
import { SocketMessage } from "./../../types/socket-message.type";
import getRoom from "../../lib/getRoom";
import saveRoom from "../../lib/saveRoom";
import { socketInfo } from "../socketInfo";

export default async function handleReadyState(
  data: Extract<SocketMessage, { type: "ready_status" }>
) {
  const { roomCode, userId, isReady } = data;

  // 준비 상태 저장
  let users = await getRoom(roomCode);
  if (users.length > 0) {
    users = users.map((user) => {
      if (user.userId === userId) {
        return { ...user, isReady };
      }
      return user;
    });
  }

  await saveRoom({ roomCode: roomCode, users: users });

  // 모두 준비 상태일 경우 메세지 전송
  users = await getRoom(roomCode);

  const isAllReady = users.every((user) => user.isReady === true);
  if (users.length >= 2) {
    if (isAllReady) {
      users.forEach((user) => {
        const socket = socketInfo.get(user.userId);
        socket?.send(
          JSON.stringify({
            type: "all_ready",
            isAllReady: true,
          })
        );
      });
    } else {
      // 상대방에게 내 준비 상태 전송
      users.forEach((user) => {
        if (user.userId !== userId) {
          console.log("전송!");
          const socket = socketInfo.get(user.userId);
          socket?.send(
            JSON.stringify({
              type: "opponent_ready_state",
              isOpponentReady: isReady,
            })
          );
        }
      });
    }
  }
}
