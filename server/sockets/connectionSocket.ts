import WebSocket from "ws";
import type { ExtendedWebSocket } from "../types/extended-websocket.type";

type RoomInfo = {
  users: {
    userId: string;
    socket: WebSocket;
  }[];
};

// 현재 모든 방의 상태를 저장하는 공간 -> redis에 저장 예정
const rooms = new Map<string, RoomInfo>();

export default function handleWebSocketConnection(wss: WebSocket.Server) {
  // .on : 이벤트 핸들러를 등록하는 메서드
  wss.on("connection", (ws: ExtendedWebSocket) => {
    // connection : 클라이언트가 접속 성공했을 때 발생
    // ws : 방금 연결된 그 한 클라이언트와 통신할 수 있는 WebSocket 연결 객체

    console.log("====   WebSocket is Connected...!!!   ====");

    // message : 클라이언트가 서버에게 메시지를 보냈을 때 실행되는 이벤트
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString()); // JSON.parse : String -> 객체, ws 서버는 기본적으로 모든 수신 메시지를 Buffer로 처리하기 때문에 toString()으로 문자열 변환 처리를 해줘야 함

      if (data.type == "create") {
        const roomCode = "YNE123"; // 랜덤 생성, 디비 중복 확인 해야함
        rooms.set(roomCode, { users: [] });

        ws.send(
          JSON.stringify({
            type: "success",
            message: "방을 성공적으로 생성했습니다.",
            roomCode: roomCode,
          })
        );
      } else if (data.type === "join") {
        const { userId, roomCode } = data;
        ws.userId = userId;
        ws.roomCode = roomCode;

        // 해당하는 방이 없을 경우
        if (!rooms.has(roomCode)) {
          ws.send(
            JSON.stringify({
              type: "room_not_found",
              message: "방을 찾을 수 없습니다.",
            })
          );
          ws.close();
          return;
        } else {
          const room = rooms.get(roomCode);

          if (room!.users.length >= 2) {
            ws.send(
              JSON.stringify({
                type: "room_full",
                message: "방이 가득 찼습니다.",
              })
            );
            ws.close();
            return;
          } else {
            room!.users.push({ userId, socket: ws });
            console.log(`[${roomCode}] 현재 접속 유저:`, room);

            if (room!.users.length == 2) {
              room!.users.forEach(({ socket }: { socket: WebSocket }) => {
                socket.send(
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
    });

    ws.on("close", () => {
      console.log("====   WebSocket is Disconnected...!!!   ====");

      if (ws.roomCode) {
        const room = rooms.get(ws.roomCode);

        if (room) {
          room.users = room.users.filter(
            (user) => user["userId"] !== ws.userId
          );

          if (!room.users.length) {
            console.log(`방이 비었습니다. [${ws.roomCode}] 방이 삭제됩니다.`);
            rooms.delete(ws.roomCode);
          }
        }
      }
      console.log(rooms);
    });
  });
}
