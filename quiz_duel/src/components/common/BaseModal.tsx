import "./BaseModal.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../shadcn/dialog";
import Button from "./Button";

interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  content: React.ReactNode;
  closeButtonLabel: string;
  activeButton: React.ReactNode;
  width?: number;
  height?: number;
}

const BaseModal = ({ height = 450, ...props }: Props) => {
  const onOpenChange = () => {
    props.onOpenChange((isOpen) => !isOpen);
  };

  return (
    <div>
      <Dialog open={props.open} onOpenChange={onOpenChange}>
        <DialogContent
          className="w-90 flex flex-col justify-between gap-0 [&>button]:hidden"
          style={{ width: props.width, height: height }}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {props.title}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="h-full mt-1">{props.content}</div>

          <DialogFooter className="!justify-center gap-3">
            {props.closeButtonLabel ? (
              <Button
                text={props.closeButtonLabel}
                type="DEFAULT"
                onButtonClick={() => {
                  props.onOpenChange(false);
                }}
              />
            ) : (
              <div></div>
            )}

            {props.activeButton}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BaseModal;
