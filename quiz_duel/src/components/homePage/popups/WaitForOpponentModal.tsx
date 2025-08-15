import { useSocket } from "@/SocketProvider";
import { DialogFooter } from "../../shadcn/dialog";
import WaitForOpponent from "./WaitForOpponent";
import Button from "@/components/common/Button";
import { useEffect } from "react";
import { useRoomInfoContext, useSetModalStepContext } from "../Lobby";

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitForOpponentModal = ({ setOpen }: Props) => {
  const { subscribe, send } = useSocket();
  const { setModalStep } = useSetModalStepContext();
  const { room, setRoom } = useRoomInfoContext();

  useEffect(() => {
    const unsubscribe = subscribe((msg) => {
      if (msg.type === "all_users_joined") {
        if (msg.connCompleted) {
          console.log("모두 접속 완료");
          setModalStep("WAIT_READY");

          if (!room.code) {
            setRoom((prev) => {
              return {
                ...prev,
                ["code"]: msg.roomCode,
              };
            });
          }
        }
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const onWaitCancelBtnClick = () => {
    setOpen?.(false);
    send({
      type: "exit",
    });
  };

  return (
    <div>
      <div className="h-full mt-3 mb-2">
        <WaitForOpponent />
      </div>

      <DialogFooter className="flex flex-row !justify-center gap-3 mt-8">
        <Button
          text="대기 취소"
          type="NEGATIVE"
          onButtonClick={onWaitCancelBtnClick}
        />
      </DialogFooter>
    </div>
  );
};

export default WaitForOpponentModal;
