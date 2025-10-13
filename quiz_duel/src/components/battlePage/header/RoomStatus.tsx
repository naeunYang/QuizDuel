import "./RoomStatus.css";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { Progress } from "../../shadcn/progress";
import { BadgeInfo } from "lucide-react";
import { Button } from "../../shadcn/button";
import { Tooltip } from "../../shadcn/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

interface RoomInfo {
  title: string;
  category: string[];
  level: string;
  quizCount: string;
  timeLimit: string;
  users: string[];
}

interface Props {
  code: string;
  roomInfo: RoomInfo;
}

export default function RoomStatus({ code, roomInfo }: Props) {
  const [roomInfos, setRoomInfos] = useState<RoomInfo | null>(null);

  const getValue = async () => {
    try {
      const { data: cateogry_master } = await supabase
        .from("category_master")
        .select("categoryName")
        .in("categoryID", roomInfo.category);
      const category = cateogry_master?.map((item) => item.categoryName);

      const { data: level_master } = await supabase
        .from("level_master")
        .select("levelName")
        .eq("levelID", roomInfo.level);
      const level = level_master?.map((item) => item.levelName)[0];

      const { data: count_master } = await supabase
        .from("count_master")
        .select("countName")
        .eq("seq", roomInfo.quizCount);
      const count = count_master?.map((item) => item.countName)[0];

      const { data: time_master } = await supabase
        .from("time_master")
        .select("timeName")
        .eq("seq", roomInfo.timeLimit);
      const time = time_master?.map((item) => item.timeName)[0];

      setRoomInfos({
        title: roomInfo.title,
        category: category ?? [],
        level: level,
        quizCount: count,
        timeLimit: time,
        users: roomInfo.users,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (roomInfo) {
      getValue();
    }
  }, [roomInfo]);

  return (
    <div className="RoomStatus">
      <div className="info">
        <div className="code">{code}</div>
        <div className="title">{roomInfos?.title}</div>
      </div>
      <div className="quiz_count">
        <div>문제 1 / {roomInfos?.quizCount}</div>
        <Progress value={10} className="w-[100%]" />
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
                <div className="setting_value">{roomInfos?.quizCount}</div>
              </div>
              <div className="setting">
                <div className="setting_title">난이도</div>
                <div className="setting_value">{roomInfos?.level}</div>
              </div>
              <div className="setting">
                <div className="setting_title">카테고리</div>
                {roomInfos?.category.map((item, index) => (
                  <div key={index} className="setting_value">
                    {item}
                  </div>
                ))}
              </div>
              <div className="setting">
                <div className="setting_title">제한시간</div>
                <div className="setting_value">{roomInfos?.timeLimit}</div>
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
