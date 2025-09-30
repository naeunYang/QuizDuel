import { useState } from "react";
import "./AnswerOX.css";

interface Props {
  answer: string | number | null;
}

export default function AnswerOX({ answer }: Props) {
  const [clickedValue, setClickedValue] = useState<"O" | "X" | null>(null);

  const onClickItem = (value: "O" | "X") => {
    if (answer) return;

    setClickedValue(value);
  };

  return (
    <div className="AnswerOX">
      <div
        className={`answer_value ${clickedValue === "O" ? "click" : ""} ${
          answer === "O" ? "correct_answer" : ""
        }`}
        onClick={() => onClickItem("O")}
      >
        O
      </div>
      <div
        className={`answer_value ${clickedValue === "X" ? "click" : ""} ${
          answer === "X" ? "correct_answer" : ""
        }`}
        onClick={() => onClickItem("X")}
      >
        X
      </div>
    </div>
  );
}
