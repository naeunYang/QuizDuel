import "./WaitForOpponent.css";
import { Spinner } from "../common/LoadingSpinner";
import { Card, CardContent } from "../shadcn/card";
import { Share, Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Tooltip, TooltipTrigger, TooltipContent } from "../shadcn/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import SharePlatform from "./SharePlatform";
import type { RoomInfo } from "@/types/roomInfo.types";

import { useState, useEffect } from "react";

const WaitForOpponent = ({ room }: { room: RoomInfo }) => {
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001"); // 소켓 연결 요청

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          // JSON.stringify : 객체 -> String으로 변환, 메시지는 문자열만 보낼 수 있기 때문
          type: "join",
          userId: crypto.randomUUID(),
          roomCode: room.code,
        })
      );
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "ready") {
        if (data.ready) {
          console.log("모두 접속 완료");
        }
      }
    };
  }, []);

  const onCopyBtnClick = () => {
    copy(room.code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const onSharePlatformClick = () => {
    window.Kakao.Share.sendCustom({
      templateId: Number(import.meta.env.VITE_KAKAO_SHARE_TEMPLETE_KEY),
      templateArgs: {
        TITLE: String(room.title),
        CODE: String(room.code),
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
            {room.code}&nbsp;
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
            <PopoverContent className="w-63 h-24 flex flex-wrap gap-2 justify-start items-start overflow-hidden">
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
