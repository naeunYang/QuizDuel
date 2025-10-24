import "./Players.css";

import { useUserStatus } from "@/stores/useUserStatus";

import User from "./User";
import Timer from "./Timer";
import Chat from "./Chat";

export default function Palyers({ timeLimit }: { timeLimit: string }) {
  const { userStatus } = useUserStatus();

  return (
    <div className="Palyers">
      <div className="users">
        <User
          userProfile="player1.PNG"
          userName="Player1"
          score="240"
          userStatus={userStatus}
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
