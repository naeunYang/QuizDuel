import "./GameOverPopup.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../shadcn/dialog";
import Button from "@/components/common/Button";
import { Settings } from "lucide-react";

interface Props {
  winner: "Player1" | "Player2";
}

export default function GameOverPopup({ winner }: Props) {
  const profile = (userProfileImg: string, player: string, score: number) => {
    return (
      <div className={`profile`}>
        <img
          className={`${winner === player ? "win" : "lose"}`}
          src={`../src/assets/${userProfileImg}`}
        />
        <div
          className="username"
          style={
            winner === player ? { color: "#00796B" } : { color: "#B0BEC5" }
          }
        >
          {player}
        </div>
        <div
          className="score"
          style={
            winner === player ? { color: "#F57C00" } : { color: "#B0BEC5" }
          }
        >
          {score}점
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true}>
      <DialogContent className="w-110 flex flex-col justify-between gap-0 [&>button]:hidden border-none bg-[#F5FFFA]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">게임 종료</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="container">
          <div className="winner">🎉{winner} 승리!🎉</div>
          <div className="player">
            {profile("player1.PNG", "Player1", 240)}
            <img src={`../src/assets/versus.png`} className="versus" />
            {profile("player2.PNG", "Player2", 320)}
          </div>
        </div>

        <DialogFooter className="flex flex-row !justify-center gap-3">
          <Button text="한판 더!" type="POSITIVE" onButtonClick={() => {}} />
          <Button text="나가기" type="DEFAULT" onButtonClick={() => {}} />
          <Settings className="text-[#00796B]" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
