import "./LabelSelect.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

interface Props {
  text: string;
  direction: "vertical" | "horizontal";
  placeholder?: string;
  width?: number;
  defaultValue?: string;
  selectLabel?: string;
  itemList: {
    name: string;
    value: string;
  }[];
}

const LabelSelect = ({ placeholder = "", ...props }: Props) => {
  return (
    <div className={`LabelSelect ${props.direction}`}>
      <label className="label_section">{props.text}</label>
      <Select defaultValue={props.defaultValue}>
        <SelectTrigger
          className="min-w-30 justify-center"
          style={{ width: props.width }}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{props.selectLabel}</SelectLabel>
            {props.itemList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LabelSelect;
