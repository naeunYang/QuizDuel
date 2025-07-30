import type { RoomInfo } from "@/types/roomInfo.types";
import type { ReceiveSocketMessage } from "@/types/receive-socket-message.types";

export function handleSocketMessage(
  wsRef: React.RefObject<WebSocket | null>,
  msg: MessageEvent,
  setIsConnComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setRoom: React.Dispatch<React.SetStateAction<RoomInfo>>,
  userId: string,
  setSocketErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  setOpponentState: React.Dispatch<React.SetStateAction<boolean>>
) {
  const data: ReceiveSocketMessage = JSON.parse(msg.data);

  switch (data.type) {
    case "room_create_success":
      console.log(data.message);

      setRoom((prev) => {
        return {
          ...prev,
          ["code"]: data.roomCode,
        };
      });

      wsRef.current!.send(
        JSON.stringify({
          type: "join",
          userId: userId,
          roomCode: data.roomCode,
        })
      );

      break;

    case "room_full":
    case "room_not_found":
      setSocketErrorMsg(data.message);
      console.log(data.message);

      break;

    case "all_users_joined":
      if (data.connCompleted) {
        console.log("모두 접속 완료");

        if (setRoom) {
          setRoom((prev) => {
            return {
              ...prev,
              ["code"]: data.roomCode,
            };
          });
        }

        setIsConnComplete(data.connCompleted);
      }
      break;

    case "all_ready":
      if (data.isAllReady) {
        // 페이지 이동
        console.log("준비 전부 완료");
      }
      break;

    case "opponent_ready_state":
      setOpponentState(data.isOpponentReady);
      break;
  }
}
