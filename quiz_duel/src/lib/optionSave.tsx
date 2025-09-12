import { supabase } from "@/lib/supabaseClient";

import { toast } from "sonner";

import type { OptionData } from "../components/adminPage/types/room-options.types";

// 데이터 유효성 검사
function validation(optionItems: OptionData[]) {
  // 공백 체크
  const isBlank = optionItems.some(
    (item) => item.id === "" || item.value === ""
  );
  if (isBlank) {
    toast.error("공란이 있으면 저장할 수 없습니다.");
    return false;
  }

  // 중복 키 체크
  const isDuplicate =
    optionItems.length !== new Set(optionItems.map((data) => data.id)).size;
  if (isDuplicate) {
    toast.error("중복된 키는 저장할 수 없습니다.");
    return false;
  }

  return true;
}

const optionSave = async (
  tableName: string,
  keyColumn: string,
  valueColumn: string,
  optionItems: OptionData[],
  delOptionItems: string[]
) => {
  // 유효성 검사
  if (!validation(optionItems)) return;

  try {
    if (delOptionItems.length > 0) {
      const { error: delError } = await supabase
        .from(tableName)
        .delete()
        .in(keyColumn, delOptionItems);

      if (delError) {
        toast.error("저장 실패");
        return;
      }
    }

    const { data, error: saveError } = await supabase
      .from(tableName)
      .upsert(
        optionItems.map((item) => ({
          [keyColumn]: item.id,
          [valueColumn]: item.value,
        })),
        { onConflict: keyColumn }
      )
      .select();

    if (!data) return [];

    if (saveError) {
      toast.error("저장 실패");
      return;
    }

    toast.success("저장 성공");

    return data.map((item, index) => ({
      key: index,
      id: item[keyColumn],
      value: item[valueColumn],
      editable: false,
    }));
  } catch (error) {
    console.error(error);
  }
};

export default optionSave;
