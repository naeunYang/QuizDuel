import "./Toolbar.css";

import QuizEditor from "./manage/QuizEditor";
import QuizSearch from "./QuizSearch";

import type { SearchInput } from "./types/search-value.types";
import type { TableRef } from "./types/table-ref.types";

const Toolbar = ({
  setSearchValue,
  tableRef,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<SearchInput | null>>;
  tableRef: React.RefObject<TableRef | null>;
}) => {
  return (
    <div className="Toolbar">
      <QuizEditor tableRef={tableRef} />
      <QuizSearch setSearchValue={setSearchValue} />
    </div>
  );
};

export default Toolbar;
