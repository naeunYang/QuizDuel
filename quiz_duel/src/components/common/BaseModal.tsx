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
  closeButtonLabel: string | undefined;
  onCloseButtonClick?: () => void;
  activeButton: React.ReactNode;
  width?: number;
  height?: number;
}

const BaseModal = ({ height = 450, ...props }: Props) => {
  const onCloseButtonClick = () => {
    props.onOpenChange(false);
    if (props.onCloseButtonClick) {
      props.onCloseButtonClick();
    }
  };

  return (
    <div>
      <Dialog open={props.open}>
        <DialogContent
          className="w-90 flex flex-col justify-between gap-0 [&>button]:hidden"
          style={{ width: props.width, height: height }}
        >
          <DialogHeader>
            {props.title && (
              <DialogTitle className="text-center text-xl">
                {props.title}
              </DialogTitle>
            )}
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="h-full mt-1">{props.content}</div>

          <DialogFooter className="flex flex-row !justify-center gap-3">
            {props.closeButtonLabel ? (
              <Button
                text={props.closeButtonLabel}
                type="DEFAULT"
                onButtonClick={onCloseButtonClick}
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
