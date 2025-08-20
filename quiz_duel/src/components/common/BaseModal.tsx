// React Hooks
import type { ReactElement } from "react";
import { cloneElement } from "react";

// 컴포넌트
import { Dialog, DialogContent } from "../shadcn/dialog";
import { BorderBeam } from "@/components/magicui/border-beam";
import type { ModalStep } from "../homePage/types/modal-step.types";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  modalStep: ModalStep;
  children: ReactElement<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
  }>;
}

const BaseModal = ({ open, setOpen, userId, modalStep, children }: Props) => {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="w-90 flex flex-col justify-between gap-0 [&>button]:hidden border-none">
          {cloneElement(children, { setOpen, userId })}
          {modalStep === "WAIT_READY" && (
            <BorderBeam
              duration={6}
              delay={3}
              size={400}
              borderWidth={2}
              className="from-transparent to-transparent rounded-full"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BaseModal;
