import "./ConfirmModal.css";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../shadcn/alert-dialog";

interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  closeButtonLabel?: string;
  activeButton: React.ReactNode;
  height?: number;
}

const ConfirmModal = ({
  closeButtonLabel = "취소",
  height = 170,
  ...props
}: Props) => {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent className="w-80 pt-4" style={{ height: height }}>
        <AlertDialogHeader className="ConfirmModal">
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <label>{props.content}</label>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center gap-3">
          <AlertDialogCancel
            onClick={() => props.onOpenChange(false)}
            className="min-w-20 h-[40px] text-[#A4A4A4] bg-[#F4F4F4] hover:bg-[#E6E6E6] hover:text-[#A4A4A4] active:bg-[#DADADA] text-[17px] cursor-pointer"
          >
            {closeButtonLabel}
          </AlertDialogCancel>
          {props.activeButton}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
