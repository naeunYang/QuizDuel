import "./WaitForReady.css";
import WaitForReadyProfile from "./WaitForReadyProfile";

const WaitForReady = () => {
  return (
    <div className="WaitForReady">
      <WaitForReadyProfile
        userProfile="player1.PNG"
        backColor="#FFE7D2"
        userName="Player1"
        isReady={true}
      />
      <img className="versus" src="../src/assets/versus.png" />
      <WaitForReadyProfile
        userProfile="player2.PNG"
        backColor="#DBF5D7"
        userName="Player2"
        isReady={false}
      />
    </div>
  );
};

export default WaitForReady;
