import "./QuizContent.css";

import QuizListTable from "./QuizListTable";
import Toolbar from "./Toolbar";

const QuizContent = () => {
  return (
    <div className="QuizContent">
      <section className="toolbar_section">
        <Toolbar />
      </section>
      <section className="table_section">
        <QuizListTable />
      </section>
    </div>
  );
};

export default QuizContent;
