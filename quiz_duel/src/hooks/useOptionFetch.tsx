import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import type { OptionData } from "../components/adminPage/types/room-options.types";

const useOptionFetch = (
  tableName: string,
  keyColumn: string,
  valueColumn: string
) => {
  const [optionData, setOptionData] = useState<OptionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from(tableName).select("*");
        if (!data) return [];

        setOptionData(
          data.map((item, index) => ({
            key: index,
            id: item[keyColumn],
            value: item[valueColumn],
            editable: false,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tableName, keyColumn, valueColumn]);

  return optionData;
};

export default useOptionFetch;
