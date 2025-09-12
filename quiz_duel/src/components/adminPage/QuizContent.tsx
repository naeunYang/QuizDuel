import "./QuizContent.css";

import { createContext, useEffect, useState, useRef, useContext } from "react";
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
export const setOptionDataContext = createContext<React.Dispatch<
  React.SetStateAction<RoomOption | null>
> | null>(null);

// 테이블 행 개수
const TableRowsCntContext = createContext<{
  tableRowsCnt: number;
  setTableRowsCnt: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);
export function useTableRowsCntContext() {
  const dispatch = useContext(TableRowsCntContext);
  if (!dispatch) throw new Error("TableRowsCntContext에 문제가 있다");
  return dispatch;
}

const QuizContent = () => {
  const [roomOptions, setRoomOptions] = useState<RoomOption | null>(null); // 방 옵션
  const [searchValue, setSearchValue] = useState<SearchInput | null>(null); // 검색 조건
  const [tableRowsCnt, setTableRowsCnt] = useState<number>(0); // 행 수
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
        <TableRowsCntContext.Provider
          value={{
            tableRowsCnt: tableRowsCnt,
            setTableRowsCnt: setTableRowsCnt,
          }}
        >
          <section className="toolbar_section">
            <setOptionDataContext.Provider value={setRoomOptions}>
              <Toolbar setSearchValue={setSearchValue} tableRef={tableRef} />
            </setOptionDataContext.Provider>
          </section>
          <section className="table_section">
            <QuizListTable ref={tableRef} searchValue={searchValue} />
          </section>
        </TableRowsCntContext.Provider>
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
