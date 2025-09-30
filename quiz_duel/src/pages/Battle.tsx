import "./Battle.css";

import { useParams } from "react-router-dom";

import RoomStatus from "@/components/battlePage/header/RoomStatus";
import Palyers from "@/components/battlePage/body/Players";
import QuizContent from "@/components/battlePage/footer/QuizContent";
import GameOverPopup from "@/components/battlePage/GameOverPopup";

const Battle = () => {
  const params = useParams();

  return (
    <div className="Battle">
      <div className="roomInfo">
        <RoomStatus code={params.code!} />
      </div>
      <div className="players">
        <Palyers />
      </div>
      <div className="quiz">
        <QuizContent />
      </div>
      <GameOverPopup winner={"Player2"} />
    </div>
  );
};

export default Battle;
