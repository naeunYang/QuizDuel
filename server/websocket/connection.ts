import WebSocket from "ws";
import type { ExtendedWebSocket } from "../types/extended-websocket.type";
import handleCreate from "./handlers/handleCreate";
import handleJoin from "./handlers/handleJoin";
import handleClose from "./handlers/handleClose";
import handleReadyState from "./handlers/handleReadyState";
import type { SocketMessage } from "../types/socket-message.type";
import handleExit from "./handlers/handleExit";
import { socketInfo } from "./socketInfo";

export default function handleWebSocketConnection(wss: WebSocket.Server) {
  // .on : 이벤트 핸들러를 등록하는 메서드
  wss.on("connection", (ws: ExtendedWebSocket) => {
    // connection : 클라이언트가 접속 성공했을 때 발생
    // ws : 방금 연결된 그 한 클라이언트와 통신할 수 있는 WebSocket 연결 객체

    console.log("====   WebSocket is Connected...!!!   ====");

    // message : 클라이언트가 서버에게 메시지를 보냈을 때 실행되는 이벤트
    ws.on("message", async (msg) => {
      // JSON.parse : String -> 객체, ws 서버는 기본적으로 모든 수신 메시지를 Buffer로 처리하기 때문에 toString()으로 문자열 변환 처리를 해줘야 함
      const data: SocketMessage = JSON.parse(msg.toString());

      if (data.type == "create") {
        handleCreate(ws, data);
      } else if (data.type === "join") {
        handleJoin(ws, data);
      } else if (data.type === "ready_status") {
        handleReadyState(data);
      } else if (data.type === "exit") {
        handleExit(ws);
      }
    });

    ws.on("close", async () => {
      console.log("====   WebSocket is Disconnected...!!!   ====");

      handleExit(ws);

      // 소켓 삭제
      if (ws.userId && socketInfo.has(ws.userId)) {
        socketInfo.delete(ws.userId);
      }
    });
  });
}
