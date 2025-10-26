import { useEffect, useState } from "react";
import "./AnswerOX.css";
import { useUserStatus } from "@/stores/useUserStatus";
import { useSocket } from "@/context/SocketProvider";

interface Props {
  answer: string | null;
}

export default function AnswerOX({ answer }: Props) {
  const [clickedValue, setClickedValue] = useState<"O" | "X" | null>(null);
  const { userStatus, setUserStatus } = useUserStatus();
  const { send, subscribe } = useSocket();

  useEffect(() => {}, [userStatus]);

  useEffect(() => {
    if (clickedValue) {
      setUserStatus("Submit");
    }
  }, [clickedValue]);

  useEffect(() => {
    if (answer) {
      if (clickedValue === answer) {
        setUserStatus("Correct");
      } else {
        setUserStatus("Wrong");
      }
    }
  }, [answer]);

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
