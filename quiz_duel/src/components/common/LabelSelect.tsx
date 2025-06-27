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
  label: string;
  direction: "vertical" | "horizontal";
  placeholder?: string;
  content?: string;
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
      <label className="label_section">{props.label}</label>
      <Select defaultValue={props.defaultValue} value={props.content}>
        <SelectTrigger
          className="min-w-30 justify-center !text-[16px]"
          style={{ width: props.width }}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{props.selectLabel}</SelectLabel>
            {props.itemList.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="!text-[16px]"
              >
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
