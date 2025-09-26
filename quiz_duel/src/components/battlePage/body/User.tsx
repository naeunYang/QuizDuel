import "./User.css";

interface Props {
  userProfile: "player1.PNG" | "player2.PNG";
  userName: string;
  score: string;
  isComplete: boolean;
}

export default function User({
  userProfile,
  userName,
  score,
  isComplete,
}: Props) {
  const compeleteStyle = { border: "2px solid #5296D5" };
  const notCompeleteStyle = { border: "2px solid #BDBDBD" };

  return (
    <div
      className="User"
      style={isComplete ? compeleteStyle : notCompeleteStyle}
    >
      <img src={`../src/assets/${userProfile}`} />
      <div className="name">{userName}</div>
      <div className="score">{score + "점"}</div>
      {isComplete ? (
        <div className="status complete">선택 완료</div>
      ) : (
        <div className="status waiting">대기중</div>
      )}
    </div>
  );
}
