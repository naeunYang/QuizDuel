import "./RoomStatus.css";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { Progress } from "../../shadcn/progress";
import { BadgeInfo } from "lucide-react";
import { Button } from "../../shadcn/button";
import { Tooltip } from "../../shadcn/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

import type { RoomInfo } from "@/types/battle-room-info.types";
import axios from "axios";
import { useCurrentQuizStore } from "@/stores/useCurrentQuizStore";
interface Props {
  code: string;
  roomInfo: RoomInfo;
}

export default function RoomStatus({ code, roomInfo }: Props) {
  const [roomInfos, setRoomInfos] = useState<RoomInfo>(roomInfo);
  const { currentIndex } = useCurrentQuizStore();

  // Name 값 추출
  const getValue = async () => {
    try {
      let category;
      if (roomInfo.category[0] === "random") {
        category = ["랜덤"];
      } else {
        const { data: cateogry_master } = await supabase
          .from("category_master")
          .select("categoryName")
          .in("categoryID", roomInfo.category);
        category = cateogry_master?.map((item) => item.categoryName);
      }

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
        quizIds: roomInfo.quizIds,
        currentIndex: roomInfo.currentIndex,
        status: roomInfo.status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 방 상태 PLAYING으로 변경
  const setRoomStatus = async () => {
    try {
      await axios.post("/api/battle/room-status", {
        code: code,
        status: "PLAYING",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (roomInfo) {
      getValue(); // Name 값 추출 후 roomInfo 다시 세팅
      setRoomStatus(); // 방 상태 변경
    }
  }, [roomInfo]);

  return (
    <div className="RoomStatus">
      <div className="info">
        <div className="code">{code}</div>
        <div className="title">{roomInfos.title}</div>
      </div>
      <div className="quiz_count">
        <div>
          문제 {currentIndex + 1} / {roomInfos.quizIds.length}
        </div>
        <Progress
          value={((currentIndex + 1) / roomInfos.quizIds.length) * 100}
          className="w-[100%]"
        />
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
                <div className="setting_value">{roomInfos.quizCount}</div>
              </div>
              <div className="setting">
                <div className="setting_title">난이도</div>
                <div className="setting_value">{roomInfos.level}</div>
              </div>
              <div className="setting">
                <div className="setting_title">카테고리</div>
                {roomInfos.category.map((item, index) => (
                  <div key={index} className="setting_value">
                    {item}
                  </div>
                ))}
              </div>
              <div className="setting">
                <div className="setting_title">제한시간</div>
                <div className="setting_value">{roomInfos.timeLimit}</div>
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
