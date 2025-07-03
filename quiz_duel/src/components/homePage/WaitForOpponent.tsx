import "./WaitForOpponent.css";
import { Spinner } from "../common/LoadingSpinner";
import { Card, CardContent } from "../shadcn/card";
import { Share, Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Tooltip, TooltipTrigger, TooltipContent } from "../shadcn/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import SharePlatform from "./SharePlatform";

import { useState } from "react";

const WaitForOpponent = ({ roomCode }: { roomCode: string }) => {
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const onCopyBtnClick = () => {
    copy(roomCode);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const onSharePlatformClick = () => {
    window.Kakao.Share.sendDefault({
      objectType: "text",
      text: "기본 템플릿으로 제공하는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.",
      link: {
        mobileWebUrl: "https://developers.kakao.com",
        webUrl: "https://developers.kakao.com",
      },
    });
  };

  return (
    <div className="WaitForOpponent">
      <Spinner className="text-yellow-400 w-20 h-20" />
      <span className="title_section">🖐️ 상대를 기다리는 중...</span>
      <Card className="rounded-md bg-[#F5F5F5] w-70 h-25 pt-4">
        <CardContent>
          <p className="cardcontent_section copy">
            {roomCode}&nbsp;
            <Tooltip>
              <TooltipTrigger>
                {isCopied ? (
                  <Check className="w-5 h-5 cursor-pointer" />
                ) : (
                  <Copy
                    className="w-5 h-5 cursor-pointer"
                    onClick={onCopyBtnClick}
                  />
                )}
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Copy code to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </p>

          <Popover>
            <PopoverTrigger className="flex flex-row justify-center items-center w-full">
              <p className="cardcontent_section share">
                초대 링크 공유하기&nbsp;
                <Share className="w-4 h-4" />
              </p>
            </PopoverTrigger>
            <PopoverContent className="w-63 h-41 flex flex-wrap gap-2 justify-start items-start overflow-hidden">
              <SharePlatform
                fileName="kakaoTalk.png"
                platformName="카카오톡"
                onLogoClick={onSharePlatformClick}
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitForOpponent;
