import "./LabelTextArea.css";
import { Textarea } from "../shadcn/textarea";

interface Props {
  label: string;
  direction: "vertical" | "horizontal";
  name?: string;
  placeholder?: string;
  content?: string;
  width?: number;
  height?: number;
  onTextChange: (name: string, value: string) => void;
  readonly?: boolean;
}

const LabelTextArea = (props: Props) => {
  return (
    <div className={`LabelTextArea ${props.direction}`}>
      <label className="label_section">{props.label}</label>
      <Textarea
        className="!text-[1.125rem] placeholder:text-[#AAAAAA] min-w-30 max-w-full focus:border-none "
        name={props.name}
        placeholder={props.placeholder}
        value={props.content}
        onChange={(e) => props.onTextChange(e.target.name, e.target.value)}
        style={{ width: props.width, height: props.height, resize: "none" }}
        readOnly={props.readonly}
      />
    </div>
  );
};

export default LabelTextArea;
