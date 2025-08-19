import "./Admin.css";

import QuizContent from "@/components/adminPage/QuizContent";
import logo from "../assets/logo.png";

const Admin = () => {
  return (
    <div className="Admin">
      <div className="logo_section">
        <img src={logo} />
      </div>
      <div className="content_section">
        <QuizContent />
      </div>
    </div>
  );
};

export default Admin;
