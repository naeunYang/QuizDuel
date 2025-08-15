import "./WaitForReady.css";
import WaitForReadyProfile from "./WaitForReadyProfile";
import versus from "../../../assets/versus.png";

interface Props {
  isReady: boolean;
  opponentState: boolean;
}

const WaitForReady = ({ isReady, opponentState }: Props) => {
  return (
    <div className="WaitForReady">
      <WaitForReadyProfile
        userProfile="player1.PNG"
        backColor="#FFE7D2"
        userName="Player1"
        isReady={isReady}
      />
      <img className="versus" src={versus} />
      <WaitForReadyProfile
        userProfile="player2.PNG"
        backColor="#DBF5D7"
        userName="Player2"
        isReady={opponentState}
      />
    </div>
  );
};

export default WaitForReady;
