import "./QuizContent.css";

import { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import masterData from "../../masterData.json";

import QuizListTable from "./table/QuizListTable";
import Toolbar from "./Toolbar";
import { Toaster } from "sonner";

import type { RoomOption } from "./types/room-options.types";
import type { SearchInput } from "./types/search-value.types";
import type { TableRef } from "./types/table-ref.types";

// 옵션 정보 전역으로 저장
export const OptionDataContext = createContext<RoomOption | null>(null);

const QuizContent = () => {
  const [roomOptions, setRoomOptions] = useState<RoomOption | null>(null); // 방 옵션
  const [searchValue, setSearchValue] = useState<SearchInput | null>(null); // 검색 조건
  const tableRef = useRef<TableRef>(null); // table 컴포넌트 ref(onDeleteCheckedRows())

  // 카테고리, 난이도 데이터
  useEffect(() => {
    axios
      .get("/home/room-options")
      .then((response) => {
        setRoomOptions({
          types: masterData.types,
          categories: [
            { categoryID: "-1", categoryName: "전체" },
            ...response.data.categories,
          ],
          levels: [
            { levelID: "-1", levelName: "전체" },
            ...response.data.levels,
          ],
          states: masterData.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="QuizContent">
      <OptionDataContext.Provider value={roomOptions}>
        <section className="toolbar_section">
          <Toolbar setSearchValue={setSearchValue} tableRef={tableRef} />
        </section>
        <section className="table_section">
          <QuizListTable ref={tableRef} searchValue={searchValue} />
        </section>
      </OptionDataContext.Provider>
      <Toaster
        richColors
        expand={true}
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: 15,
          },
        }}
      />
    </div>
  );
};

export default QuizContent;
