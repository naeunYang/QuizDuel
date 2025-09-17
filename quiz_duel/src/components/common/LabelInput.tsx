import "./LabelInput.css";
import { Input } from "../shadcn/input";

interface Props {
  label: string;
  direction: "vertical" | "horizontal";
  name?: string;
  content?: string | number;
  width?: number;
  placeholder?: string;
  onInputValueChange: (name: string, value: string) => void;
  onEnterKeyDown?: () => void;
  type?: string;
  align?: "left" | "right" | "center" | "justify" | "start" | "end";
  readonly?: boolean;
}

const LabelInput = (props: Props) => {
  return (
    <div className={`LabelInput ${props.direction}`}>
      <label className="label_section">{props.label}</label>
      <Input
        type={props.type ?? "text"}
        autoFocus={true}
        className="!text-[1.125rem] placeholder:text-[#AAAAAA] min-w-30 max-w-full focus:border-none "
        name={props.name}
        value={props.content ?? ""}
        onChange={(e) =>
          props.onInputValueChange(e.target.name, e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") props.onEnterKeyDown?.();
        }}
        placeholder={props.placeholder}
        style={{ width: props.width, textAlign: props.align }}
        readOnly={props.readonly}
      />
    </div>
  );
};

export default LabelInput;
