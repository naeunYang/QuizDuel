import { ExtendedWebSocket } from "../../types/extended-websocket.type";
import getRoom from "../../lib/getRoom";
import saveRoom from "../../lib/saveRoom";
import deleteRoom from "../../lib/deleteRoom";
import { socketInfo } from "./../socketInfo";
import { RoomInfo } from "../../types/room-info.type";

export default async function handleClose(ws: ExtendedWebSocket) {
  if (ws.roomCode) {
    let users = await getRoom(ws.roomCode);

    // 방이 이미 삭제된 경우 사용자 소켓 정보만 삭제
    if (!users) {
      // 소켓 삭제
      if (ws.userId && socketInfo.has(ws.userId)) {
        socketInfo.delete(ws.userId);
      }

      return;
    }

    if (users.length > 1) {
      // 상대방에게 quit 상태 전달
      users.forEach((user) => {
        if (user.userId !== ws.userId) {
          const socket = socketInfo.get(user.userId);

          socket?.send(
            JSON.stringify({
              type: "opponent_quit",
            })
          );
        }
      });

      await saveRoom({
        roomCode: ws.roomCode,
        users: users.filter(
          (user: RoomInfo["users"][0]) => user.userId !== ws.userId
        ),
      });
    } else {
      console.log(`방이 비었습니다. [${ws.roomCode}] 방이 삭제됩니다.`);
      await deleteRoom(ws.roomCode);
    }

    users = await getRoom(ws.roomCode);
    console.log(users);

    // 소켓 삭제
    if (ws.userId && socketInfo.has(ws.userId)) {
      socketInfo.delete(ws.userId);
    }
  }
}
