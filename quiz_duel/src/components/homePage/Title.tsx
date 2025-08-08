import "./Title.css";
import logo from "../../assets/logo.png";

const Title = () => {
  return (
    <div className="Title">
      <img className="logo_section" src={logo} />
      <div className="description_section">실시간 1 vs 1 퀴즈 대전</div>
    </div>
  );
};

export default Title;
