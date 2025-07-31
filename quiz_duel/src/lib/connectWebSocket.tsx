import type { RoomInfo } from "@/types/roomInfo.types";
import { handleSocketMessage } from "./handleSocketMessage";
import type { SendSocketMessage } from "@/types/send-socket-message.typs";

const socketUrl = "ws://localhost:3001";

// 소켓 연결(1.방 생성, 2.참가하기, 3.카톡으로 입장)
export default function connectWebSocket(
  wsRef: React.RefObject<WebSocket | null>,
  sendMeesage: SendSocketMessage,
  setIsConnComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setRoom: React.Dispatch<React.SetStateAction<RoomInfo>>,
  userId: string,
  setSocketErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  setOpponentState: React.Dispatch<React.SetStateAction<boolean>>,
  setIsOpenErrMsg: React.Dispatch<React.SetStateAction<boolean>>,
  setGoToBattleUrl: React.Dispatch<React.SetStateAction<string>>
) {
  // wsRef.current = new WebSocket("ws://localhost:3001"); 으로 연결을 시도하는 순간 onopen이벤트가 동작함
  // 따라서 WebSocket 생성 직후 즉시 등록해야 한다.

  // 소켓 연결
  if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
    wsRef.current = new WebSocket(socketUrl); // 소켓 연결 요청

    wsRef.current.onopen = () => {
      console.log("====   WebSocket is Connected...!!!   ====");
      wsRef.current!.send(JSON.stringify(sendMeesage));
    };

    wsRef.current.onmessage = (msg) => {
      handleSocketMessage(
        wsRef,
        msg,
        setIsConnComplete,
        setRoom,
        userId,
        setSocketErrorMsg,
        setOpponentState,
        setIsOpenErrMsg,
        setGoToBattleUrl
      );
    };

    wsRef.current.onerror = (e) => {
      console.error("WebSocket error:", e);
      if (setSocketErrorMsg) {
        setSocketErrorMsg("서버 연결 중 오류가 발생했습니다.");
      }
    };

    wsRef.current.onclose = () => {
      console.log("====   WebSocket is Disconnected...!!!   ====");
    };
  } else if (wsRef.current.readyState === WebSocket.CONNECTING) {
    // 연결 중일때는 onopen 이벤트를 기다림
    wsRef.current.onopen = () => {
      wsRef.current!.send(JSON.stringify(sendMeesage));
    };
  } else {
    wsRef.current!.send(JSON.stringify(sendMeesage));
  }
}
