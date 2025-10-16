import "./Battle.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import RoomStatus from "@/components/battlePage/header/RoomStatus";
import Palyers from "@/components/battlePage/body/Players";
import QuizContent from "@/components/battlePage/footer/QuizContent";
import GameOverPopup from "@/components/battlePage/GameOverPopup";

import type { RoomInfo } from "@/types/battle-room-info.types";
import LoadingModal from "@/components/common/LoadingModal";

const START_TIMER = 5;

const Battle = () => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [startTimerModal, setStartTimerModal] = useState(true);
  const [timer, setTimer] = useState(START_TIMER);
  const params = useParams();
  const nav = useNavigate();

  // 게임 시작 타이머
  useEffect(() => {
    if (timer <= 0) {
      setStartTimerModal(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 세팅된 방 정보 가져오기
  const fetchRoomData = async () => {
    try {
      const res = await axios.get(`/api/battle/room-info/${params.code}`);
      const data = res.data;

      if (!data || Object.keys(data).length === 0) {
        alert("방 정보를 불러올 수 없습니다.");
        nav("/");
        return;
      } else if (data.users.length < 2) {
        alert("상대방이 나갔습니다.");
        nav("/");
        return;
      }

      setRoomInfo(res.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  return (
    <div>
      <LoadingModal
        content={
          <div>
            게임 시작<div className="text-6xl">{timer}</div>
          </div>
        }
        open={startTimerModal}
        type="NONE"
        className="[&>button]:hidden h-50 w-50"
        overlayColor="linear-gradient(to right, #51c4d0, #a18cd1)"
      />
      {!startTimerModal && roomInfo && (
        <div className="Battle">
          <div className="roomInfo">
            <RoomStatus code={params.code!} roomInfo={roomInfo!} />
          </div>
          <div className="players">
            <Palyers timeLimit={roomInfo.timeLimit} />
          </div>
          <div className="quiz">
            <QuizContent quzIdList={roomInfo.quizIds} />
          </div>
          <GameOverPopup winner={"Player2"} />
        </div>
      )}
    </div>
  );
};

export default Battle;
