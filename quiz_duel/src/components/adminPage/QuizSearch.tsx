import "./QuizSearch.css";

import { useEffect, useState, useContext } from "react";
import { supabase } from "@/lib/supabaseClient";

import LabelInput from "../common/LabelInput";
import LabelSelect from "../common/LabelSelect";
import { Search } from "lucide-react";
import { OptionDataContext } from "./QuizContent";

import type { SearchInput } from "./types/search-value.types";

const QuizSearch = ({
  setSearchValue,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<SearchInput | null>>;
}) => {
  const [searchInput, setSearchInput] = useState<SearchInput | null>(null);
  const [dataLength, setDataLength] = useState<number | null>(null);
  const roomOptions = useContext(OptionDataContext);

  // total 데이터 수 세팅
  useEffect(() => {
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

  const onChangeInput = (name: string, value: string) => {
    setSearchInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSearchBtnClick = async () => {
    // 검색 조건
    const idValue = searchInput?.id ?? "";
    const typeValue =
      !searchInput?.type || searchInput?.type == "-1" ? "" : searchInput?.type;
    const categoryValue =
      !searchInput?.category || searchInput?.category == "-1"
        ? ""
        : searchInput?.category;
    const levelValue =
      !searchInput?.level || searchInput?.level == "-1"
        ? ""
        : searchInput?.level;
    const statusValue =
      !searchInput?.status || searchInput?.status == "-1"
        ? ""
        : searchInput?.status;

    setSearchValue({
      id: idValue,
      type: typeValue,
      category: categoryValue,
      level: levelValue,
      status: statusValue,
    });
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
        itemList={roomOptions?.types}
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
        itemList={roomOptions?.categories}
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
        itemList={roomOptions?.levels}
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
        itemList={roomOptions?.states}
        getValue={(item) => item.stateID}
        getName={(item) => item.stateName}
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
