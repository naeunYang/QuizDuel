import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../shadcn/dialog";
import SetRoomOption from "./SetRoomOption";
import { Button as ShadBtn } from "../../shadcn/button";

const SetRoomOptionModal = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <ShadBtn className={"admin_button w-23"}>방 옵션 관리</ShadBtn>
        </DialogTrigger>
        <DialogContent className="w-95 flex flex-col justify-between gap-0 [&>button]:hidden border-none">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              <div>방 옵션 관리</div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="h-full mt-3 mb-6">
            <SetRoomOption />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SetRoomOptionModal;
