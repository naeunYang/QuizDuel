import "./OptionTabItem.css";

import { Input } from "@/components/shadcn/input";
import { Trash2 } from "lucide-react";

import type { OptionData } from "../types/room-options.types";

interface Props {
  data: OptionData;
  onDelOptionBtnClick: (key: number) => void;
  setOptionItems: React.Dispatch<React.SetStateAction<OptionData[]>>;
}

const OptionTabItem = ({
  data,
  onDelOptionBtnClick,
  setOptionItems,
}: Props) => {
  const onIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionItems((prev) =>
      prev.map((item) =>
        item.key === data.key ? { ...item, id: e.target.value } : item
      )
    );
  };

  const onValueInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionItems((prev) =>
      prev.map((item) =>
        item.key === data.key ? { ...item, value: e.target.value } : item
      )
    );
  };

  return (
    <div className="content-wrapper">
      <div className="key">
        🗝️
        <Input
          className="text-center"
          value={data.id}
          onChange={onIdInputChange}
        />
      </div>
      <Input
        className="value"
        value={data.value}
        onChange={onValueInputChange}
      />
      <Trash2
        className="cursor-pointer w-5 h-5"
        onClick={() => {
          onDelOptionBtnClick(data.key);
        }}
      />
    </div>
  );
};

export default OptionTabItem;
