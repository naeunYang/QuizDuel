import { DialogFooter } from "../../shadcn/dialog";
import WaitForOpponent2 from "./WaitForOpponent2";
import Button from "@/components/common/Button";

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaitForOpponentModal = ({ setOpen }: Props) => {
  const onWaitCancelBtnClick = () => {
    setOpen?.(false);
  };

  return (
    <div>
      <div className="h-full mt-3 mb-2">
        <WaitForOpponent2 />
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
