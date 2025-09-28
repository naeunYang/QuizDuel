import { useState } from "react";
import "./AnswerOX.css";

export default function AnswerOX() {
  const [answer, setAnswer] = useState<"O" | "X" | null>(null);

  return (
    <div className="AnswerOX">
      <div
        className={`answer_value ${answer === "O" ? "active" : ""}`}
        onClick={() => setAnswer("O")}
      >
        O
      </div>
      <div
        className={`answer_value ${answer === "X" ? "active" : ""}`}
        onClick={() => setAnswer("X")}
      >
        X
      </div>
    </div>
  );
}
