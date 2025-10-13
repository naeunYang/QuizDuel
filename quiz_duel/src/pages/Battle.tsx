import "./Battle.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import RoomStatus from "@/components/battlePage/header/RoomStatus";
import Palyers from "@/components/battlePage/body/Players";
import QuizContent from "@/components/battlePage/footer/QuizContent";
import GameOverPopup from "@/components/battlePage/GameOverPopup";

interface RoomInfo {
  title: string;
  category: string[];
  level: string;
  quizCount: string;
  timeLimit: string;
  users: string[];
}

const Battle = () => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const params = useParams();

  // 세팅된 방 정보 가져오기
  const fetchRoomData = async () => {
    await axios
      .get(`/api/battle/room-info/${params.code}`)
      .then((res) => setRoomInfo(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  if (!roomInfo || Object.keys(roomInfo!).length === 0) {
    return <div>방 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="Battle">
      <div className="roomInfo">
        <RoomStatus code={params.code!} roomInfo={roomInfo} />
      </div>
      <div className="players">
        <Palyers />
      </div>
      <div className="quiz">
        <QuizContent />
      </div>
      <GameOverPopup winner={"Player2"} />
    </div>
  );
};

export default Battle;
