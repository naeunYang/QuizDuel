import "./Toolbar.css";

import QuizEditor from "./QuizEditor";
import QuizSearch from "./QuizSearch";

import type { SearchInput } from "./types/search-value.types";

const Toolbar = ({
  setSearchValue,
}: {
  setSearchValue: React.Dispatch<React.SetStateAction<SearchInput | null>>;
}) => {
  return (
    <div className="Toolbar">
      <QuizEditor />
      <QuizSearch setSearchValue={setSearchValue} />
    </div>
  );
};

export default Toolbar;
