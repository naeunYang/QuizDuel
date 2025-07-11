import WebSocket from "ws";

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
  wss.on("connection", (ws) => {
    // connection : 클라이언트가 접속 성공했을 때 발생
    // ws : 방금 연결된 그 한 클라이언트와 통신할 수 있는 WebSocket 연결 객체

    console.log("====   WebSocket is Connected...!!!   ====");

    // message : 클라이언트가 서버에게 메시지를 보냈을 때 실행되는 이벤트
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString()); // JSON.parse : String -> 객체, ws 서버는 기본적으로 모든 수신 메시지를 Buffer로 처리하기 때문에 toString()으로 문자열 변환 처리를 해줘야 함

      if (data.type === "join") {
        const { userId, roomCode } = data;

        if (!rooms.has(roomCode)) {
          rooms.set(roomCode, { users: [] });
        }

        const room = rooms.get(roomCode); // 해당 room 객체 전체를 가져옴
        room!.users.push({ userId, socket: ws });

        console.log(`[${roomCode}] 현재 접속 유저:`, room);

        if (room!.users.length == 2) {
          console.log(`[${roomCode}] 모두 접속 완료`);

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
    });

    ws.on("close", () => {
      console.log("====   WebSocket is Disconnected...!!!   ====");
    });
  });
}
