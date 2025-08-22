import "./Admin.css";

import { useNavigate } from "react-router-dom";

import QuizContent from "@/components/adminPage/QuizContent";
import logo from "../assets/logo.png";

const Admin = () => {
  const nav = useNavigate();

  const onLogoClick = () => {
    nav("/");
  };

  return (
    <div className="Admin">
      <div className="logo_section">
        <img src={logo} onClick={onLogoClick} />
      </div>
      <div className="content_section">
        <QuizContent />
      </div>
    </div>
  );
};

export default Admin;
