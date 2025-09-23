import "./QuizSearch.css";

import { useEffect, useState, useContext } from "react";
import { useTableRowsCntContext } from "./QuizContent";

import LabelInput from "../common/LabelInput";
import LabelSelect from "../common/LabelSelect";
import { RotateCcw } from "lucide-react";
import { OptionDataContext } from "./QuizContent";

import type { SearchInput } from "./types/search-value.types";

const QuizSearch = ({
  setSearchValue,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<SearchInput | null>>;
}) => {
  const [searchInput, setSearchInput] = useState<SearchInput | null>(null);
  const roomOptions = useContext(OptionDataContext);
  const { tableRowsCnt } = useTableRowsCntContext();

  useEffect(() => {
    if (!searchInput) {
      setSearchConditions();
    }
  }, [searchInput]);

  useEffect(() => {
    setSearchConditions();
  }, [
    searchInput?.type,
    searchInput?.category,
    searchInput?.level,
    searchInput?.status,
  ]);

  const onChangeInput = (name: string, value: string) => {
    setSearchInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 검색 조건 설정
  const setSearchConditions = () => {
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

  const onResetBtnClick = () => {
    setSearchInput(null);
  };

  return (
    <div className="QuizSearch">
      <div className="total">
        Total
        <p>{tableRowsCnt}</p>
      </div>
      <LabelInput
        label="ID"
        direction="horizontal"
        content={searchInput?.id}
        onInputValueChange={onChangeInput}
        width={150}
        name="id"
        placeholder="ID 입력"
        onEnterKeyDown={() => setSearchConditions()}
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
          <RotateCcw onClick={onResetBtnClick} />
          {/* 검색 조건 리셋 */}
        </div>
      </section>
    </div>
  );
};

export default QuizSearch;
