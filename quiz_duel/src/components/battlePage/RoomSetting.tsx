import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../shadcn/dialog";
import CreateRoom from "../homePage/popups/CreateRoom";
import Button from "@/components/common/Button";

import type { RoomInfo } from "../homePage/types/roomInfo.types";
import LoadingModal from "../common/LoadingModal";
import { useState } from "react";

const currentRoomInfo: RoomInfo = {
  code: "ZHPJ4D",
  title: "모두 모여라~",
  quizCount: 2,
  level: "high",
  category: ["comic", "drama", "meme"],
  timeLimit: 2,
};

interface Props {
  setRoomSettingPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RoomSetting({ setRoomSettingPopupOpen }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <DialogContent className="w-90 flex flex-col justify-between gap-0 [&>button]:hidden border-none bg-[#F5FFFA]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">🎲 방 설정</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <CreateRoom defaultRoomData={currentRoomInfo} />
        </div>
        <DialogFooter className="relative flex flex-row !justify-center gap-3 pt-3">
          <Button
            text="수정"
            type="POSITIVE"
            onButtonClick={() => {
              setIsLoading(true);
            }}
          />
          <Button
            text="취소"
            type="DEFAULT"
            onButtonClick={() => {
              setRoomSettingPopupOpen(false);
            }}
          />
        </DialogFooter>
      </DialogContent>
      <LoadingModal
        content="게임 생성중..."
        open={isLoading}
        type="LOADING"
        className="[&>button]:hidden"
      />
    </div>
  );
}
