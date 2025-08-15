import "./WaitForReadyProfile.css";
import { Card, CardContent } from "../../shadcn/card";

interface Props {
  userProfile: string;
  backColor: string;
  userName: string;
  isReady: boolean;
}

const WaitForReadyProfile = ({
  userProfile,
  backColor,
  userName,
  isReady,
}: Props) => {
  return (
    <div className="WaitForReadyProfile">
      <Card
        className="rounded-md h-50 p-0 shadow-sm"
        style={{ background: backColor }}
      >
        <CardContent className="p-0">
          <img src={`../src/assets/${userProfile}`} />
          <div className="user_name">{userName}</div>
        </CardContent>
        <div className="ready_status">
          {isReady ? (
            <div className="ready">Ready</div>
          ) : (
            <div className="waiting">Waiting...</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default WaitForReadyProfile;
