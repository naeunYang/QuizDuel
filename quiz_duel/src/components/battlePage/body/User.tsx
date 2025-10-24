import type { UserStatus } from "@/types/user-status";
import "./User.css";

interface Props {
  userProfile: "player1.PNG" | "player2.PNG";
  userName: string;
  score: string;
  userStatus: UserStatus;
}

export default function User({
  userProfile,
  userName,
  score,
  userStatus,
}: Props) {
  let container_style;
  let statusDiv;

  switch (userStatus) {
    case "Submit":
      container_style = { border: "2px solid #5296D5" };
      statusDiv = <div className="status complete">선택 완료</div>;
      break;
    case "Non-Submit":
      container_style = { border: "2px solid #BDBDBD" };
      statusDiv = <div className="status waiting">선택중</div>;
      break;
    case "Correct":
      container_style = { border: "2px solid #2ecc71" };
      statusDiv = <div className="status correct">정답!😝</div>;
      break;
    case "Wrong":
      container_style = { border: "2px solid #e74c3c" };
      statusDiv = <div className="status wrong">오답!😭</div>;
      break;
  }

  return (
    <div className="User" style={container_style}>
      <img src={`../src/assets/${userProfile}`} />
      <div className="name">{userName}</div>
      <div className="score">{score + "점"}</div>
      {statusDiv}
    </div>
  );
}
