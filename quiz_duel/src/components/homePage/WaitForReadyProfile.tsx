import "./WaitForReadyProfile.css";
import { Card, CardContent } from "../shadcn/card";

interface Props {
  userProfile: string;
  backColor: string;
  userName: string;
  isReady: boolean;
}

const WaitForReadyProfile = (props: Props) => {
  return (
    <div className="WaitForReadyProfile">
      <Card
        className="rounded-md h-55 p-0 shadow-sm"
        style={{ background: props.backColor }}
      >
        <CardContent className="p-0">
          <img src={props.userProfile} />
          <div className="user_name">{props.userName}</div>
        </CardContent>
        <div className="ready_status">
          {props.isReady ? (
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
