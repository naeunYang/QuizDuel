// React Hooks
import { useEffect, useRef } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useSetModalStepContext } from "../Lobby";
import { useSetRoomInfoContext } from "@/context/RoomInfoProvider";

// 컴포넌트
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../shadcn/dialog";
import Button from "@/components/common/Button";
import CreateRoom from "./CreateRoom";

// type
import type { RoomInfo } from "../types/roomInfo.types";

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
}

interface ChildHandle {
  getValue: () => RoomInfo;
}

const CreateRoomModal = ({ setOpen, userId }: Props) => {
  const { setModalStep } = useSetModalStepContext();
  const { subscribe, send } = useSocket();
  const childRef = useRef<ChildHandle>(null);
  const setRoom = useSetRoomInfoContext();

  useEffect(() => {
    const unsubscribe = subscribe((msg) => {
      // room_create_success 메시지만 받음
      if (msg.type === "room_create_success") {
        console.log(msg.message);

        // join 요청
        send({
          type: "join",
          userId: userId!,
          roomCode: msg.roomCode,
        });

        setRoom((prev) => {
          return {
            ...prev,
            code: msg.roomCode,
          };
        });

        // 대기 창으로 전환
        setModalStep("WAIT_OPPONENT");
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const onCreateBtnClick = () => {
    if (childRef.current) {
      const childRoomInput = childRef.current.getValue();

      // create 요청
      send({
        type: "create",
        title:
          childRoomInput.title === ""
            ? "진 사람 떡볶이 쏘기😎"
            : childRoomInput.title,
        quizCount: childRoomInput.quizCount,
        level: childRoomInput.level,
        category:
          childRoomInput.category.length === 0
            ? ["random"]
            : childRoomInput.category,
        timeLimit: childRoomInput.timeLimit,
      });

      setRoom((prev) => {
        return {
          ...prev,
          title: childRoomInput.title,
        };
      });
    }
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
        <CreateRoom ref={childRef} />
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
