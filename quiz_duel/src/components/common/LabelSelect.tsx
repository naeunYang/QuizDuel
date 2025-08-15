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

interface Props<T> {
  label: string;
  direction: "vertical" | "horizontal";
  name: string;
  content?: string;
  width?: number;
  selectLabel?: string;
  itemList?: readonly T[];
  getValue: (item: T) => string | number;
  getName: (item: T) => string;
  onSelectValueChange: (name: string, value: string) => void;
}

const LabelSelect = <T,>(props: Props<T>) => {
  return (
    <div className={`LabelSelect ${props.direction}`}>
      <label className="label_section">{props.label}</label>
      <Select
        value={props.content ?? ""}
        onValueChange={(value) => props.onSelectValueChange(props.name, value)}
      >
        <SelectTrigger
          className="min-w-30 justify-center !text-[1rem]"
          style={{ width: props.width }}
        >
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-50">
            <SelectLabel>{props.selectLabel}</SelectLabel>
            {props.itemList?.map((item, idx) => (
              <SelectItem
                key={idx}
                value={String(props.getValue(item))}
                className="!text-[1rem]"
              >
                {props.getName(item)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LabelSelect;
