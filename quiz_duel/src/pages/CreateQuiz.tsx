import "./Admin.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { X } from "lucide-react";
import QuizCreateForm from "@/components/createQuizPage/QuizCreateForm";
import { QuizCreateGrid } from "@/components/createQuizPage/QuizCreateGrid";

import type { QuizData } from "@/components/createQuizPage/types/quizdata.types";

const CreateQuiz = () => {
  const [quizList, setQuizList] = useState<QuizData[]>([]);
  const nav = useNavigate();

  const onLogoClick = () => {
    nav("/", { replace: true });
  };

  const onCloseBtnClick = () => {
    nav("/admin", { replace: true });
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
          <QuizCreateForm quizList={quizList} setQuizList={setQuizList} />
          <QuizCreateGrid quizList={quizList} setQuizList={setQuizList} />
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
