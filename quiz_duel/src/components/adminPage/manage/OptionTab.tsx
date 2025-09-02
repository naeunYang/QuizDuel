import "./OptionTab.css";

import { Card } from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Badge } from "@/components/shadcn/badge";
import { BadgePlus, Trash2 } from "lucide-react";
import { Spinner } from "@/components/common/LoadingSpinner";

import type { OptionData } from "../types/room-options.types";

const OptionTab = ({ optionData }: { optionData: OptionData[] }) => {
  if (optionData.length < 1) {
    return <Spinner className="text-red-400 w-20 h-20 mt-30 mb-30" />;
  }

  return (
    <div>
      <Card className="flex flex-col gap-3 justify-center items-center h-90 max-h-90 truncate overflow-auto">
        {optionData.map((data) => (
          <div key={data.id} className="content-wrapper">
            <label className="key text-center">🗝️ {data.id}</label>
            <Input className="value" value={data.value} onChange={() => {}} />
            <Trash2 className="cursor-pointer w-5" />
          </div>
        ))}
        <Badge variant="secondary" className="w-20 h-8 cursor-pointer mt-2">
          <BadgePlus />
          옵션 추가
        </Badge>
      </Card>
    </div>
  );
};

export default OptionTab;
