import "./OptionTabItem.css";

import { Input } from "@/components/shadcn/input";
import { Trash2 } from "lucide-react";

import type { OptionData } from "../types/room-options.types";

interface Props {
  data: OptionData;
  onDelOptionBtnClick: (key: number) => void;
}

const OptionTabItem = ({ data, onDelOptionBtnClick }: Props) => {
  return (
    <div key={data.id} className="content-wrapper">
      <div className="key">
        🗝️
        <Input className="text-center" value={data.id} onChange={() => {}} />
      </div>
      <Input className="value" value={data.value} onChange={() => {}} />
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
