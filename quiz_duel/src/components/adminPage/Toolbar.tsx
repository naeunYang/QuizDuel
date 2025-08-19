import "./Toolbar.css";

import QuizEditor from "./QuizEditor";
import QuizSearch from "./QuizSearch";

const Toolbar = () => {
  return (
    <div className="Toolbar">
      <QuizEditor />
      <QuizSearch />
    </div>
  );
};

export default Toolbar;
