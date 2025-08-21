import "./ConfirmModal.css";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../shadcn/alert-dialog";

interface Props {
  title: string;
  content: string;
  activeButton: React.ReactNode;
  trigger: React.ReactNode;
  closeButtonLabel?: string;
  height?: number;
}

const ConfirmModal = ({
  title,
  content,
  activeButton,
  trigger,
  closeButtonLabel = "취소",
  height = 170,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-80 pt-4" style={{ height: height }}>
        <AlertDialogHeader className="ConfirmModal">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <label>{content}</label>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center gap-3">
          <AlertDialogCancel className="min-w-20 h-[2.5rem] text-[#A4A4A4] bg-[#F4F4F4] hover:bg-[#E6E6E6] hover:text-[#A4A4A4] active:bg-[#DADADA] text-[1.1rem] cursor-pointer">
            {closeButtonLabel}
          </AlertDialogCancel>
          <div
            onClick={() => {
              setOpen(false);
            }}
          >
            {activeButton}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
