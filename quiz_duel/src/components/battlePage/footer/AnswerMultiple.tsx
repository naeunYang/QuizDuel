import { useState } from "react";
import "./AnswerMultiple.css";

const mockData = ["기생충", "살인의 추억", "괴물", "신과 함께"];

export default function AnswerMultiple() {
  const [selectValue, setSelectValue] = useState<number | null>(null);

  const Item = ({ index, content }: { index: number; content: string }) => {
    return (
      <div className="Item" onClick={() => setSelectValue(index)}>
        <div className={`index ${selectValue === index ? "active" : ""}`}>
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
