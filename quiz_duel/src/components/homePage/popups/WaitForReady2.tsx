import "./WaitForReady2.css";
import WaitForReadyProfile from "../WaitForReadyProfile";

interface Props {
  isReady: boolean;
  opponentState: boolean;
}

const WaitForReady2 = ({ isReady, opponentState }: Props) => {
  return (
    <div className="WaitForReady">
      <WaitForReadyProfile
        userProfile="player1.PNG"
        backColor="#FFE7D2"
        userName="Player1"
        isReady={isReady}
      />
      <img className="versus" src="../src/assets/versus.png" />
      <WaitForReadyProfile
        userProfile="player2.PNG"
        backColor="#DBF5D7"
        userName="Player2"
        isReady={opponentState}
      />
    </div>
  );
};

export default WaitForReady2;
