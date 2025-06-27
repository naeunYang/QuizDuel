import "./LabelTextArea.css";
import { Textarea } from "../shadcn/textarea";

interface Props {
  label: string;
  direction: "vertical" | "horizontal";
  placeholder?: string;
  content?: string;
  width?: number;
  height?: number;
}

const LabelTextArea = (props: Props) => {
  return (
    <div className={`LabelTextArea ${props.direction}`}>
      <label className="label_section">{props.label}</label>
      <Textarea
        className="!text-[18px] placeholder:text-[#AAAAAA] min-w-30 max-w-full focus:border-none "
        placeholder={props.placeholder}
        value={props.content}
        style={{ width: props.width, height: props.height, resize: "none" }}
      />
    </div>
  );
};

export default LabelTextArea;
