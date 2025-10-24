import { useEffect, useState } from "react";
import "./AnswerMultiple.css";
import { useUserStatus } from "@/stores/useUserStatus";

interface Props {
  answer: string | number | null;
  choices: string[];
}

export default function AnswerMultiple({ answer, choices }: Props) {
  const [selectValue, setSelectValue] = useState<number | null>(null);
  const { setUserStatus } = useUserStatus();

  useEffect(() => {
    if (selectValue) {
      setUserStatus("Submit");
    }
  }, [selectValue]);

  useEffect(() => {
    if (answer) {
      const findAnswerIndex = choices.findIndex((item) => item === answer);
      if (selectValue === findAnswerIndex + 1) {
        setUserStatus("Correct");
      } else {
        setUserStatus("Wrong");
      }
    }
  }, [answer]);

  const onClickItem = (index: number) => {
    if (answer) return;

    setSelectValue(index);
  };

  const Item = ({ index, content }: { index: number; content: string }) => {
    return (
      <div className="Item" onClick={() => onClickItem(index)}>
        <div
          className={`index ${selectValue === index ? "active" : ""} ${
            answer === content ? "correct_answer" : ""
          }`}
        >
          {index}
        </div>
        <div className="content">{content}</div>
      </div>
    );
  };

  return (
    <div className="AnswerMultiple">
      {choices.map((content, index) => (
        <Item key={index} index={index + 1} content={content} />
      ))}
    </div>
  );
}
