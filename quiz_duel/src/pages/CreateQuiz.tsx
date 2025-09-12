import "./Admin.css";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { X } from "lucide-react";
import Button from "@/components/common/Button";
import QuizCreateForm from "@/components/createQuizPage/QuizCreateForm";
import { QuizCreateGrid } from "@/components/createQuizPage/QuizCreateGrid";

const CreateQuiz = () => {
  const nav = useNavigate();

  const onLogoClick = () => {
    nav("/");
  };

  const onCloseBtnClick = () => {
    nav("/admin");
  };

  return (
    <div className="Admin">
      <div className="logo_section">
        <img src={logo} onClick={onLogoClick} />
      </div>
      <div className="content_section">
        <div className="header">
          <span className="title">🎁 문제 생성</span>
          <X className="close" onClick={onCloseBtnClick} />
        </div>
        <div className="body">
          <QuizCreateForm />
          <QuizCreateGrid />
        </div>
        <div className="footer">
          <Button text="추가하기" type="POSITIVE" onButtonClick={() => {}} />
          <Button text="취소하기" type="DEFAULT" onButtonClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
