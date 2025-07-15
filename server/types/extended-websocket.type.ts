import WebSocket from "ws";

// 인터페이스 확장
export interface ExtendedWebSocket extends WebSocket {
  userId?: string;
  roomCode?: string;
}
