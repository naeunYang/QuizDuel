import { useEffect, useState, useContext } from "react";
import useOptionFetch from "../hooks/useOptionFetch";
import optionSave from "../lib/optionSave";
import { setOptionDataContext } from "../QuizContent";

import { Card } from "@/components/shadcn/card";
import { Badge } from "@/components/shadcn/badge";
import { BadgePlus } from "lucide-react";
import OptionTabItem from "./OptionTabItem";
import { Button as ShadBtn } from "../../shadcn/button";
import { toast } from "sonner";
import { Spinner } from "@/components/common/LoadingSpinner";

import type { OptionData } from "../types/room-options.types";

interface Props {
  tableName: string;
  keyColumn: string;
  valueColumn: string;
}

const OptionTab = ({ tableName, keyColumn, valueColumn }: Props) => {
  const defaultData = useOptionFetch(tableName, keyColumn, valueColumn);
  const [optionItems, setOptionItems] = useState<OptionData[]>(defaultData);
  const [delOptionItems, setDelOptionItems] = useState<string[]>([]);
  const setRoomOptions = useContext(setOptionDataContext);

  useEffect(() => {
    setOptionItems(defaultData);
  }, [defaultData]);

  // 옵션 추가
  const onAddOptionBtnClick = () => {
    const maxKey = optionItems.reduce((arr, cur) => Math.max(arr, cur.key), 0);

    setOptionItems((prev) => [
      ...prev,
      { key: maxKey + 1, id: "", value: "", editable: true },
    ]);
  };

  // 옵션 삭제
  const onDelOptionBtnClick = (key: number, id: string) => {
    setOptionItems((prev) => prev.filter((item) => item.key !== key));
    setDelOptionItems((prev) => [...prev, id]);
  };

  // 옵션 저장
  const onSaveClick = async () => {
    if (JSON.stringify(defaultData) === JSON.stringify(optionItems)) {
      toast.warning("변경된 데이터가 없습니다.");
      return;
    }

    if (optionItems.length > 0) {
      const data = await optionSave(
        tableName,
        keyColumn,
        valueColumn,
        optionItems,
        delOptionItems
      );
      if (data) {
        setOptionItems(data);

        // 검색 조건의 카테고리 데이터 업데이트
        if (tableName === "category_master" && setRoomOptions) {
          setRoomOptions((prev) => {
            if (!prev) {
              return {
                categories: [],
                types: [],
                levels: [],
                states: [],
              };
            }
            return {
              ...prev,
              categories: [
                { categoryID: "-1", categoryName: "전체" },
                ...data.map((item) => ({
                  categoryID: item.id,
                  categoryName: item.value,
                })),
              ],
            };
          });
        }
      }
    }
  };

  if (defaultData.length < 1) {
    return <Spinner className="text-red-400 w-20 h-20" />;
  }

  return (
    <div>
      <Card className="flex flex-col gap-3 justify-top items-center h-83 max-h-83 truncate overflow-auto">
        {optionItems.map((data, index) => (
          <OptionTabItem
            key={index}
            data={data}
            onDelOptionBtnClick={onDelOptionBtnClick}
            setOptionItems={setOptionItems}
            editable={data.editable}
          />
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
      <div className="flex flex-row !justify-center gap-3 pt-4">
        <ShadBtn className={"admin_button w-20 p-5"} onClick={onSaveClick}>
          저장
        </ShadBtn>
      </div>
    </div>
  );
};

export default OptionTab;
