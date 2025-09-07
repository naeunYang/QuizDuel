import { supabase } from "@/lib/supabaseClient";

import { toast } from "sonner";

import type { OptionData } from "../types/room-options.types";

// 데이터 유효성 검사
function validation(optionItems: OptionData[]) {
  // 중복 키 체크
  const isDuplicate =
    optionItems.length !== new Set(optionItems.map((data) => data.id)).size;
  if (isDuplicate) {
    toast.error("중복된 키는 저장할 수 없습니다.");
    return false;
  }

  // 공백 체크
  const isBlank = optionItems.some(
    (item) => item.id === "" || item.value === ""
  );
  if (isBlank) {
    toast.error("공란이 있으면 저장할 수 없습니다.");
    return false;
  }

  return true;
}

const optionSave = async (
  tableName: string,
  keyColumn: string,
  valueColumn: string,
  optionItems: OptionData[]
) => {
  // 유효성 검사
  if (!validation(optionItems)) return;

  try {
    const { error: delError } = await supabase
      .from(tableName)
      .delete()
      .neq(keyColumn, 0);

    const { data, error: saveError } = await supabase
      .from(tableName)
      .upsert(
        optionItems.map((item) => {
          return { [keyColumn]: item.id, [valueColumn]: item.value };
        }),
        { onConflict: keyColumn }
      )
      .select();

    if (delError || saveError) {
      toast.error("저장 실패");
      return;
    }

    toast.success("저장 성공");

    return data.map((item, index) => {
      return { key: index, id: item[keyColumn], value: item[valueColumn] };
    });
  } catch (error) {
    console.error(error);
  }
};

export default optionSave;
