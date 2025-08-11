import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../shadcn/dialog";
import Button from "@/components/common/Button";
import WaitForReady2 from "./WaitForReady2";
import { useRoomInfoContext } from "../Lobby";
import { useSocket } from "@/components/SocketProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
}

const WaitForReadyModal = ({ setOpen, userId }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [opponentState, setOpponentState] = useState(false);
  const { room } = useRoomInfoContext();
  const { subscribe, send } = useSocket();
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribe((msg) => {
      if (msg.type === "all_ready" && msg.isAllReady) {
        console.log("준비 전부 완료");
        nav(`/battle/${msg.roomCode}`);
      } else if (msg.type === "opponent_ready_state") {
        setOpponentState(msg.isOpponentReady);
      } else if (msg.type === "opponent_quit") {
        setOpponentState(false);
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const onCloseButtonClick = () => {
    setOpen?.(false);
    send({
      type: "exit",
    });
  };

  const onReadyBtnClick = () => {
    // setIsReady(!Ready) 시 상태 변화가 비동기적으로 일어나기 때문에 readyState에 올바른 값이 안감
    // 따라서 아래와 같이 해결함
    const currentReady = !isReady;
    setIsReady(currentReady);

    send({
      type: "ready_status",
      roomCode: room.code,
      userId: userId!,
      isReady: currentReady,
    });
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="text-center text-xl">🕹️ 대기중</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="h-full mt-3 mb-10">
        <WaitForReady2 isReady={isReady} opponentState={opponentState} />
      </div>

      <DialogFooter className="flex flex-row !justify-center gap-3">
        <Button
          text="나가기"
          type="NEGATIVE"
          onButtonClick={onCloseButtonClick}
        />
        {isReady ? (
          <Button
            text="준비취소"
            type="NEGATIVE"
            onButtonClick={onReadyBtnClick}
          />
        ) : (
          <Button
            text="준비하기"
            type="POSITIVE"
            onButtonClick={onReadyBtnClick}
          />
        )}
      </DialogFooter>
    </div>
  );
};

export default WaitForReadyModal;
