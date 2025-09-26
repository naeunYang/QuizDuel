import "./QuizContent.css";
import Solution from "./Solution";

export default function QuizContent() {
  return (
    <div className="QuizContent">
      <div className="quiz_number">문제5</div>
      <div className="content">
        <Solution />
      </div>
      <div className="answer">o x</div>
    </div>
  );
}
