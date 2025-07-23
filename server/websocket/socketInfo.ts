import WebSocket from "ws";

// 유저 별 socket 객체 저장
export const socketInfo = new Map<string, WebSocket>();
