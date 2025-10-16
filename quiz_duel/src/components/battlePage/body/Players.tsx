import "./Players.css";

import User from "./User";
import Timer from "./Timer";
import Chat from "./Chat";
import { useState } from "react";

export default function Palyers({ timeLimit }: { timeLimit: string }) {
  const [userStatus, setUserStatus] = useState<
    "Submit" | "Non-Submit" | "Correct" | "Wrong"
  >("Non-Submit");

  return (
    <div className="Palyers">
      <div className="users">
        <User
          userProfile="player1.PNG"
          userName="Player1"
          score="240"
          userStatus={"Correct"}
        />
        <Chat />
        <User
          userProfile="player2.PNG"
          userName="Player2"
          score="320"
          userStatus={"Wrong"}
        />
      </div>
      <div className="body">
        <Timer timeLimit={timeLimit} />
      </div>
    </div>
  );
}
