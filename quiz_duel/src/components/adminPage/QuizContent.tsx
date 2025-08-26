import "./QuizContent.css";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import QuizListTable from "./table/QuizListTable";
import Toolbar from "./Toolbar";

import type { RoomOption } from "@/types/room-options.types";

const OptionDataContext = createContext<{
  roomOptions: Pick<RoomOption, "categories" | "levels"> | null;
} | null>(null);

export function useOptionDataContext() {
  const value = useContext(OptionDataContext);
  if (!value) throw new Error("OptionDataContext에 문제가 있음");
  return value;
}

const QuizContent = () => {
  const [roomOptions, setRoomOptions] = useState<Pick<
    RoomOption,
    "categories" | "levels"
  > | null>(null);

  // 카테고리, 난이도 데이터
  useEffect(() => {
    axios
      .get("/home/room-options")
      .then((response) => {
        setRoomOptions({
          categories: response.data.categories,
          levels: response.data.levels,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="QuizContent">
      <OptionDataContext.Provider value={{ roomOptions: roomOptions }}>
        <section className="toolbar_section">
          <Toolbar />
        </section>
        <section className="table_section">
          <QuizListTable />
        </section>
      </OptionDataContext.Provider>
    </div>
  );
};

export default QuizContent;
