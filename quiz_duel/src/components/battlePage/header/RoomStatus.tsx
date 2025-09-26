import { Progress } from "../../shadcn/progress";
import { BadgeInfo } from "lucide-react";

import "./RoomStatus.css";
import { Button } from "../../shadcn/button";
import { Tooltip } from "../../shadcn/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

interface Props {
  code: string;
}

export default function RoomStatus({ code }: Props) {
  return (
    <div className="RoomStatus">
      <div className="info">
        <div className="code">{code}</div>
        <div className="title">진 사람 떡볶이 쏘기</div>
      </div>
      <div className="quiz_count">
        <div>문제 5 / 10</div>
        <Progress value={50} className="w-[100%]" />
      </div>
      <div className="exit">
        <Tooltip>
          <TooltipTrigger asChild>
            <BadgeInfo className="w-5" />
          </TooltipTrigger>
          <TooltipContent>
            <div className="room_info">
              <div className="setting">
                <div className="setting_title">문제 개수</div>
                <div className="setting_value">5개</div>
              </div>
              <div className="setting">
                <div className="setting_title">난이도</div>
                <div className="setting_value">상</div>
              </div>
              <div className="setting">
                <div className="setting_title">카테고리</div>
                <div className="setting_value">랜덤</div>
                <div className="setting_value">요즘 밈</div>
                <div className="setting_value">드라마</div>
              </div>
              <div className="setting">
                <div className="setting_title">제한시간</div>
                <div className="setting_value">15초</div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Button className="bg-[#9ad3dd] cursor-pointer hover:bg-[#b7e3e9]">
          🚪나가기
        </Button>
      </div>
    </div>
  );
}
