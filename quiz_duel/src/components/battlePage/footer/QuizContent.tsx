import { useEffect, useState } from "react";
import AnswerMultiple from "./AnswerMultiple";
import AnswerOX from "./AnswerOX";
import "./QuizContent.css";
import Solution from "./Solution";

export default function QuizContent({ quzIdList }: { quzIdList: string[] }) {
  const [answer, setAnswer] = useState<string | number | null>(null);
  // const [time, setTime] = useState(3);

  // useEffect(() => {
  //   if (time <= 0) {
  //     setAnswer(1);
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     setTime((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [time]);

  return (
    <div className="QuizContent">
      <div className="quiz_number">문제5</div>
      <div className="content">
        <Solution quzIdList={quzIdList} />
      </div>
      <div className="answer">
        {/* <AnswerOX answer={answer} /> */}
        <AnswerMultiple answer={answer} />
      </div>
    </div>
  );
}
