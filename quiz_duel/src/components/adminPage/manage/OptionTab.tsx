import { useState, useEffect } from "react";

import { Card } from "@/components/shadcn/card";
import { Badge } from "@/components/shadcn/badge";
import { BadgePlus } from "lucide-react";
import { Spinner } from "@/components/common/LoadingSpinner";
import OptionTabItem from "./OptionTabItem";

import type { OptionData } from "../types/room-options.types";

const OptionTab = ({ optionData }: { optionData: OptionData[] }) => {
  const [optionItems, setOptionItems] = useState<OptionData[]>(optionData);

  useEffect(() => {
    setOptionItems(optionData);
  }, [optionData]);

  // 옵션 추가
  const onAddOptionBtnClick = () => {
    setOptionItems((prev) => [...prev, { id: "", value: "" }]);
  };

  if (optionData.length < 1) {
    return <Spinner className="text-red-400 w-20 h-20 mt-30 mb-30" />;
  }

  return (
    <div>
      <Card className="flex flex-col gap-3 justify-top items-center h-83 max-h-83 truncate overflow-auto">
        {optionItems.map((data, index) => (
          <OptionTabItem key={index} data={data} />
        ))}
        <Badge
          variant="secondary"
          className="w-20 h-8 cursor-pointer mt-2"
          onClick={onAddOptionBtnClick}
        >
          <BadgePlus />
          옵션 추가
        </Badge>
      </Card>
    </div>
  );
};

export default OptionTab;
