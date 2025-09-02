import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn/tabs";
import OptionTab from "./OptionTab";

import type { OptionData } from "../types/room-options.types";

const SetRoomOption = () => {
  const [countData, setCountData] = useState<OptionData[]>([]);
  const [categoryData, setCategoryData] = useState<OptionData[]>([]);
  const [timeData, setTimeData] = useState<OptionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: count } = await supabase.from("count_master").select("*");
        if (count) {
          setCountData(
            count.map((data) => {
              return { id: data.seq, value: data.countName };
            })
          );
        }

        const { data: category } = await supabase
          .from("category_master")
          .select("*");
        if (category) {
          setCategoryData(
            category.map((data) => {
              return { id: data.categoryID, value: data.categoryName };
            })
          );
        }

        const { data: time } = await supabase.from("time_master").select("*");
        if (time) {
          setTimeData(
            time.map((data) => {
              return { id: data.seq, value: data.timeName };
            })
          );
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-full max-h-100 max-w-sm flex-col gap-6 SetRoomOption">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="count">문제 개수</TabsTrigger>
          <TabsTrigger value="category">카테고리</TabsTrigger>
          <TabsTrigger value="time">제한시간(초)</TabsTrigger>
        </TabsList>
        <TabsContent value="count">
          <OptionTab optionData={countData} />
        </TabsContent>
        <TabsContent value="category">
          <OptionTab optionData={categoryData} />
        </TabsContent>
        <TabsContent value="time">
          <OptionTab optionData={timeData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SetRoomOption;
