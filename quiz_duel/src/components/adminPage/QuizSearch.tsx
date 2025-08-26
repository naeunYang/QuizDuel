import "./QuizSearch.css";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import LabelInput from "../common/LabelInput";
import LabelSelect from "../common/LabelSelect";
import { Search } from "lucide-react";
import masterData from "../../masterData.json";
import { useOptionDataContext } from "./QuizContent";

import type { RoomOption } from "@/types/room-options.types";

interface SearchInput {
  id?: string;
  type?: string;
  category?: string;
  level?: string;
  status?: string;
}

const QuizSearch = () => {
  const [searchInput, setSearchInput] = useState<SearchInput | null>(null);
  const [dataLength, setDataLength] = useState<number | null>(null);
  const [roomOption, setRoomOptions] = useState<Pick<
    RoomOption,
    "categories" | "levels"
  > | null>(null);
  const { roomOptions } = useOptionDataContext();

  useEffect(() => {
    // total 데이터 수
    const fetchData = async () => {
      try {
        const { count, error } = await supabase
          .from("quiz_master")
          .select("*", { count: "exact", head: true });

        if (error) throw error;

        setDataLength(count);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 옵션 데이터
    if (roomOptions) {
      setRoomOptions({
        categories: [
          { categoryID: "all", categoryName: "전체" },
          ...roomOptions.categories,
        ],
        levels: [
          { seq: -1, levelID: "all", levelName: "전체" },
          ...roomOptions.levels,
        ],
      });
    }
  }, [roomOptions]);

  const onChangeInput = (name: string, value: string) => {
    setSearchInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSearchBtnClick = async () => {
    try {
      // 검색 조건
      const idValue = searchInput?.id ?? "";
      const typeValue =
        !searchInput?.type || searchInput?.type == "all"
          ? ""
          : searchInput?.type;
      const categoryValue =
        !searchInput?.category || searchInput?.category == "all"
          ? ""
          : searchInput?.category;
      const levelValue =
        !searchInput?.level || searchInput?.level == "all"
          ? ""
          : searchInput?.level;
      const statusValue =
        !searchInput?.status || searchInput?.status == "-1"
          ? ""
          : searchInput?.status;

      const { data, error } = await supabase
        .from("quiz_master")
        .select("*")
        .like("id", `%${idValue}%`)
        .like("type", `%${typeValue}%`)
        .like("categoryID", `%${categoryValue}%`)
        .like("levelID", `%${levelValue}%`)
        .like("status", `%${statusValue}%`);

      if (error) throw error;

      console.log(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="QuizSearch">
      <div className="total">
        Total
        <p>{dataLength}</p>
      </div>
      <LabelInput
        label="ID"
        direction="horizontal"
        content={searchInput?.id}
        onInputValueChange={onChangeInput}
        width={150}
        name="id"
        placeholder="ID 입력"
      />
      <LabelSelect
        label="문제형식"
        direction="horizontal"
        itemList={[{ typeID: "all", typeName: "전체" }, ...masterData.types]}
        getValue={(item) => item.typeID}
        getName={(item) => item.typeName}
        width={100}
        name="type"
        content={searchInput?.type}
        onSelectValueChange={onChangeInput}
      />
      <LabelSelect
        label="카테고리"
        direction="horizontal"
        itemList={roomOption?.categories}
        getValue={(item) => item.categoryID}
        getName={(item) => item.categoryName}
        width={135}
        name="category"
        content={searchInput?.category}
        onSelectValueChange={onChangeInput}
      />
      <LabelSelect
        label="난이도"
        direction="horizontal"
        itemList={roomOption?.levels}
        getValue={(item) => item.levelID}
        getName={(item) => item.levelName}
        width={100}
        name="level"
        content={searchInput?.level}
        onSelectValueChange={onChangeInput}
      />
      <LabelSelect
        label="상태"
        direction="horizontal"
        itemList={masterData.status}
        getValue={(item) => item.statusID}
        getName={(item) => item.statusName}
        width={135}
        name="status"
        content={searchInput?.status}
        onSelectValueChange={onChangeInput}
      />
      <section className="search_icon">
        <div>
          <Search onClick={onSearchBtnClick} />
        </div>
      </section>
    </div>
  );
};

export default QuizSearch;
