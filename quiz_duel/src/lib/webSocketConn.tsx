import type { RoomInfo } from "@/types/roomInfo.types";

export function createRoom(
  ws: WebSocket,
  setRoom: React.Dispatch<React.SetStateAction<RoomInfo>>,
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
      joinRoom(ws, data.roomCode, setIsConnComplete);
    }
  };
}

export function joinRoom(
  ws: WebSocket,
  roodCode: string,
  setIsConnComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setSocketErrorMsg?: React.Dispatch<React.SetStateAction<string>>
) {
  ws.send(
    JSON.stringify({
      type: "join",
      userId: crypto.randomUUID(), // user 식별자 생성 후 전달(userId)
      roomCode: roodCode,
    })
  );

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    switch (data.type) {
      case "ready":
        if (data.connCompleted) {
          console.log("모두 접속 완료");
          setIsConnComplete(data.connCompleted);
        }
        return;
      case "room_not_found":
        setSocketErrorMsg && setSocketErrorMsg(data.message);
        console.log(data.message);
        return;
      case "room_full":
        setSocketErrorMsg && setSocketErrorMsg(data.message);
        console.log(data.message);
        return;
      default:
        return;
    }
  };
}
