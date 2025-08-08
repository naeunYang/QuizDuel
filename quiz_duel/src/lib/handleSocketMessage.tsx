import type { RoomInfo } from "@/components/homePage/types/roomInfo.types";
import type { ReceiveSocketMessage } from "@/types/receive-socket-message.types";

export function handleSocketMessage(
  wsRef: React.RefObject<WebSocket | null>,
  msg: MessageEvent,
  setIsConnComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setRoom: React.Dispatch<React.SetStateAction<RoomInfo>>,
  userId: string,
  setSocketErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  setOpponentState: React.Dispatch<React.SetStateAction<boolean>>,
  setIsOpenErrMsg: React.Dispatch<React.SetStateAction<boolean>>,
  setGoToBattleUrl: React.Dispatch<React.SetStateAction<string>>
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
        setIsOpenErrMsg(false); // 상대방 다시 접속 시 팝업창 숨기기

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
        console.log("준비 전부 완료");
        setGoToBattleUrl(`/battle/${data.roomCode}`);
      }
      break;

    case "opponent_ready_state":
      setOpponentState(data.isOpponentReady);
      break;

    case "opponent_quit":
      setSocketErrorMsg("상대방 나갔습니다");
      break;
  }
}
