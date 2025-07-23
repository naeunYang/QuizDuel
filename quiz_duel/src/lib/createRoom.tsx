import type { RoomInfo } from "@/types/roomInfo.types";
import joinRoom from "./joinRoom";

export default function createRoom(
  ws: WebSocket,
  setRoom: React.Dispatch<React.SetStateAction<RoomInfo>>,
  userId: string,
  setIsConnComplete: React.Dispatch<React.SetStateAction<boolean>>
) {
  ws.send(
    JSON.stringify({
      // JSON.stringify : 객체 -> String으로 변환, 메시지는 문자열만 보낼 수 있기 때문
      type: "create",
    })
  );

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);

    if (data.type === "success") {
      console.log(data.message);

      setRoom((prev) => {
        return {
          ...prev,
          ["code"]: data.roomCode,
        };
      });

      joinRoom(ws, data.roomCode, userId, setIsConnComplete);
    }
  };
}
