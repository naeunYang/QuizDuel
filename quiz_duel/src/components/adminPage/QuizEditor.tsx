import "./QuizEditor.css";
import { Settings } from "lucide-react";

import Button from "../common/Button";

const QuizEditor = () => {
  return (
    <div className="QuizEditor">
      <Button type="POSITIVE" text="생성" onButtonClick={() => {}} />
      <Button type="NEGATIVE" text="삭제" onButtonClick={() => {}} />
      <Settings className="settings_icon" />
    </div>
  );
};

export default QuizEditor;
