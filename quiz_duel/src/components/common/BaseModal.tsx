import type { ReactElement } from "react";
import { cloneElement } from "react";

import "./BaseModal.css";
import { Dialog, DialogContent } from "../shadcn/dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  children: ReactElement<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
  }>;
}

const BaseModal = ({ open, setOpen, userId, children }: Props) => {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="w-90 flex flex-col justify-between gap-0 [&>button]:hidden">
          {cloneElement(children, { setOpen, userId })}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BaseModal;
