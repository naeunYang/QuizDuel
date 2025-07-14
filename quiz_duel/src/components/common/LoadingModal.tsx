import "./LoadingModal.css";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../shadcn/dialog";
import { Spinner } from "./LoadingSpinner";
import { TriangleAlert } from "lucide-react";

interface Props {
  open: boolean;
  content: string;
  type: "LOADING" | "ERROR";
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingModal = (props: Props) => {
  return (
    <div>
      <Dialog open={props.open} onOpenChange={props.onOpenChange}>
        <DialogContent className="bg-[#E8E8E8] w-80 h-35">
          <DialogTitle className="LoadingModal">
            {props.type === "LOADING" && (
              <Spinner className="text-yellow-400 w-13 h-13" show={true} />
            )}
            {props.type === "ERROR" && (
              <TriangleAlert className="text-yellow-400 w-full h-13 text-center" />
            )}
            <div>
              <label>{props.content}</label>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoadingModal;
