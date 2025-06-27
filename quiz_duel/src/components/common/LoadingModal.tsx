import "./LoadingModal.css";
import { Dialog, DialogContent, DialogTitle } from "../shadcn/dialog";
import { Spinner } from "./LoadingSpinner";

interface Props {
  open: boolean;
  content: string;
}

const LoadingModal = (props: Props) => {
  return (
    <div>
      <Dialog open={props.open}>
        <DialogContent className="bg-[#E8E8E8] w-80 h-35">
          <DialogTitle className="LoadingModal">
            <Spinner className="text-yellow-400 w-13 h-13" show={true} />
            <div>
              <label>{props.content}</label>
            </div>
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoadingModal;
