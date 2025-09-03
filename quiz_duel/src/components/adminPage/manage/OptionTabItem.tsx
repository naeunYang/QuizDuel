import "./OptionTabItem.css";

import { Input } from "@/components/shadcn/input";
import { Trash2 } from "lucide-react";

import type { OptionData } from "../types/room-options.types";

const OptionTabItem = ({ data }: { data: OptionData }) => {
  return (
    <div key={data.id} className="content-wrapper">
      <div className="key">
        🗝️
        <Input className="text-center" value={data.id} onChange={() => {}} />
      </div>
      <Input className="value" value={data.value} onChange={() => {}} />
      <Trash2 className="cursor-pointer w-5 h-5" />
    </div>
  );
};

export default OptionTabItem;
