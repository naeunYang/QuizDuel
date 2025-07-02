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

interface Props<T extends { name: string; value: string }> {
  label: string;
  direction: "vertical" | "horizontal";
  name: string;
  content?: string;
  width?: number;
  selectLabel?: string;
  itemList: readonly T[];
  onSelectValueChange: (name: string, value: string) => void;
}

const LabelSelect = <T extends { name: string; value: string }>(
  props: Props<T>
) => {
  return (
    <div className={`LabelSelect ${props.direction}`}>
      <label className="label_section">{props.label}</label>
      <Select
        value={props.content ?? ""}
        onValueChange={(value) => props.onSelectValueChange(props.name, value)}
      >
        <SelectTrigger
          className="min-w-30 justify-center !text-[16px]"
          style={{ width: props.width }}
        >
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-50">
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
