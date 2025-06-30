import "./WaitForOpponent.css";
import { Spinner } from "../common/LoadingSpinner";
import { Card, CardContent } from "../shadcn/card";
import { Share, Copy } from "lucide-react";

const WaitForOpponent = () => {
  return (
    <div className="WaitForOpponent">
      <Spinner className="text-yellow-400 w-20 h-20" />
      <span className="title_section">🖐️ 상대를 기다리는 중...</span>
      <Card className="rounded-md bg-[#F5F5F5] w-70 h-25 pt-4">
        <CardContent>
          <p className="cardcontent_section share">
            초대 링크 공유하기&nbsp;
            <Share className="w-4 h-4" />
          </p>
          <p className="cardcontent_section copy">
            ABC123&nbsp;
            <Copy className="w-5 h-5" />
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitForOpponent;
