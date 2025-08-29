import "./QuizContent.css";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import masterData from "../../masterData.json";

import QuizListTable from "./table/QuizListTable";
import Toolbar from "./Toolbar";
import { Toaster } from "sonner";

import type { RoomOption } from "./types/room-options.types";
import type { SearchInput } from "./types/search-value.types";

// 옵션 정보 전역으로 저장
export const OptionDataContext = createContext<RoomOption | null>(null);

const QuizContent = () => {
  const [roomOptions, setRoomOptions] = useState<RoomOption | null>(null);
  const [searchValue, setSearchValue] = useState<SearchInput | null>(null);

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
          <Toolbar setSearchValue={setSearchValue} />
        </section>
        <section className="table_section">
          <QuizListTable searchValue={searchValue} />
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
