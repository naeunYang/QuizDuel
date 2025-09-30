import "./GameOverPopup.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../shadcn/dialog";
import Button from "@/components/common/Button";

export default function GameOverPopup() {
  return (
    <Dialog open={true}>
      <DialogContent className="w-90 flex flex-col justify-between gap-0 [&>button]:hidden border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">게임 종료</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="h-full mt-3 mb-10">
          <div className="background-black">Player2 승리!</div>
          <div></div>
        </div>

        <DialogFooter className="flex flex-row !justify-center gap-3">
          <Button text="한판 더!" type="POSITIVE" onButtonClick={() => {}} />
          <Button text="나가기" type="DEFAULT" onButtonClick={() => {}} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
