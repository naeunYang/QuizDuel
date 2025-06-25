import "./LabelInput.css";
import { Input } from "../shadcn/input";

interface Props {
  text: string;
  direction: "vertical" | "horizontal";
  placeholder?: string;
  width?: number;
}

const LabelInput = (props: Props) => {
  return (
    <div className={`LabelInput ${props.direction}`}>
      <label className="label_section">{props.text}</label>
      <Input
        className="placeholder:text-[#AAAAAA] min-w-30 max-w-full focus:border-none "
        placeholder={props.placeholder}
        style={{ width: props.width }}
      />
    </div>
  );
};

export default LabelInput;
