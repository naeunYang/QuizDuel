import RoomStatus from "@/components/battlePage/RoomStatus";
import "./Battle.css";
import { useParams } from "react-router-dom";
import Palyers from "@/components/battlePage/Players";

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
      <div className="quiz">footer</div>
    </div>
  );
};

export default Battle;
