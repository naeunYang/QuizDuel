import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog";
import Button from "../common/Button";
import SetRoomOption from "./SetRoomOption";
import { Button as ShadBtn } from "../shadcn/button";

const buttonStyle =
  "bg-[#5a2e20] hover:bg-[#7a4531] active:bg-[#4a2316] text-white text-[1rem] font-[100] cursor-pointer";

const SetRoomOptionModal = () => {
  const [open, setOpen] = useState(false);

  const onBtnClick = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <ShadBtn className={`${buttonStyle} w-23`}>방 옵션 관리</ShadBtn>
        </DialogTrigger>
        <DialogContent className="w-90 flex flex-col justify-between gap-0 [&>button]:hidden border-none">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              방 옵션 관리
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="h-full mt-3 mb-6">
            <SetRoomOption />
          </div>
          <DialogFooter className="flex flex-row !justify-center gap-3">
            <Button type="DEFAULT" text="닫기" onButtonClick={onBtnClick} />
            <div onClick={onBtnClick}>
              <ShadBtn className={`${buttonStyle} w-20 p-5`}>저장</ShadBtn>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SetRoomOptionModal;
