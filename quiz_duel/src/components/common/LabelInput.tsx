import "./LabelInput.css";
import { Input } from "../shadcn/input";

interface Props {
  label: string;
  direction: "vertical" | "horizontal";
  name?: string;
  content?: string;
  width?: number;
  placeholder?: string;
  onInputValueChange: (name: string, value: string) => void;
}

const LabelInput = (props: Props) => {
  return (
    <div className={`LabelInput ${props.direction}`}>
      <label className="label_section">{props.label}</label>
      <Input
        autoFocus={true}
        className="!text-[18px] placeholder:text-[#AAAAAA] min-w-30 max-w-full focus:border-none "
        name={props.name}
        value={props.content}
        onChange={(e) =>
          props.onInputValueChange(e.target.name, e.target.value)
        }
        placeholder={props.placeholder}
        style={{ width: props.width }}
      />
    </div>
  );
};

export default LabelInput;
