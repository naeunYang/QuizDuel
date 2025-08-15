import { ExtendedWebSocket } from "../../types/extended-websocket.type";
import saveRoom from "../../lib/saveRoom";
import getRoom from "../../lib/getRoom";
import deleteRoom from "../../lib/deleteRoom";
import { socketInfo } from "../socketInfo";

export default async function handleExit(ws: ExtendedWebSocket) {
  if (ws.roomCode) {
    let users = await getRoom(ws.roomCode);

    if (users?.length > 1) {
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
        users: users.filter((user) => user.userId !== ws.userId),
      });
    } else {
      console.log(`방이 비었습니다. [${ws.roomCode}] 방이 삭제됩니다.`);
      await deleteRoom(ws.roomCode);
    }

    users = await getRoom(ws.roomCode);
    console.log(users);
  }
}
