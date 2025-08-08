import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../shadcn/dialog";
import Button from "@/components/common/Button";
import CreateRoom2 from "./CreateRoom2";
import { useRoomInfoContext, useModalStepContext } from "../Lobby";
import { useSocket } from "@/components/SocketProvider";
import { useEffect } from "react";

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
}

const CreateRoomModal = ({ setOpen, userId }: Props) => {
  const { room, setRoom } = useRoomInfoContext();
  const { setModalStep } = useModalStepContext();
  const { subscribe, send } = useSocket();

  useEffect(() => {
    const unsubscribe = subscribe((msg) => {
      // room_create_success 메시지만 받음
      if (msg.type === "room_create_success") {
        console.log(msg.message);

        setRoom((prev) => {
          return {
            ...prev,
            ["code"]: msg.roomCode,
          };
        });

        // join 요청
        send({
          type: "join",
          userId: userId!,
          roomCode: msg.roomCode,
        });

        // 대기 창으로 전환
        setModalStep("WAIT_OPPONENT");
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const onCreateBtnClick = () => {
    // 카테고리 선택 X 시 random값으로 설정
    if (room.category.length === 0) {
      setRoom((prev) => {
        return {
          ...prev,
          ["category"]: ["random"],
        };
      });
    }

    // 방 제목 비었을 경우 기본값으로 설정
    if (room.title === "") {
      setRoom((prev) => {
        return {
          ...prev,
          ["title"]: "진 사람 떡볶이 쏘기😎",
        };
      });
    }

    // create 요청
    send({
      type: "create",
    });
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="text-center text-xl">
          🕹️ 새 방 만들기
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="h-full mt-3 mb-2">
        <CreateRoom2 />
      </div>

      <DialogFooter className="flex flex-row !justify-center gap-3">
        <Button
          text="취소"
          type="DEFAULT"
          onButtonClick={() => {
            setOpen?.(false);
          }}
        />
        <Button text="생성" type="POSITIVE" onButtonClick={onCreateBtnClick} />
      </DialogFooter>
    </div>
  );
};

export default CreateRoomModal;
