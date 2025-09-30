import { useState } from "react";
import "./AnswerMultiple.css";

const mockData = ["기생충", "살인의 추억", "괴물", "신과 함께"];

interface Props {
  answer: string | number | null;
}

export default function AnswerMultiple({ answer }: Props) {
  const [selectValue, setSelectValue] = useState<number | null>(null);

  const onClickItem = (index: number) => {
    if (answer) return;

    setSelectValue(index);
  };

  const Item = ({ index, content }: { index: number; content: string }) => {
    return (
      <div className="Item" onClick={() => onClickItem(index)}>
        <div
          className={`index ${selectValue === index ? "active" : ""} ${
            answer === index ? "correct_answer" : ""
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
      {mockData.map((content, index) => (
        <Item key={index} index={index + 1} content={content} />
      ))}
    </div>
  );
}
