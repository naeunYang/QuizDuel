import "./Players.css";

import User from "./User";
import Timer from "./Timer";
import Chat from "./Chat";

export default function Palyers() {
  return (
    <div className="Palyers">
      <div className="users">
        <User
          userProfile="player1.PNG"
          userName="Player1"
          score="240"
          isComplete={true}
        />
        <Chat />
        <User
          userProfile="player2.PNG"
          userName="Player2"
          score="320"
          isComplete={false}
        />
      </div>
      <div className="body">
        <Timer />
      </div>
    </div>
  );
}
