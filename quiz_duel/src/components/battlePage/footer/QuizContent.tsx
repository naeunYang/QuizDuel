import AnswerMultiple from "./AnswerMultiple";
import AnswerOX from "./AnswerOX";
import "./QuizContent.css";
import Solution from "./Solution";

export default function QuizContent() {
  return (
    <div className="QuizContent">
      <div className="quiz_number">문제5</div>
      <div className="content">
        <Solution />
      </div>
      <div className="answer">
        <AnswerOX />
        {/* <AnswerMultiple /> */}
      </div>
    </div>
  );
}
