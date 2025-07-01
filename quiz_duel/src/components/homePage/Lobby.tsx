import "./Lobby.css";
import { Card, CardContent, CardFooter } from "../shadcn/card";
import Button from "../common/Button";
import { Input } from "../shadcn/input";
import BaseModal from "../common/BaseModal";
import CreateRoom from "./CreateRoom";
import WaitForOpponent from "./WaitForOpponent";
import WaitForReady from "./WaitForReady";

import { useState } from "react";

interface Room {
  title: string;
  quizCount: string;
  level: string;
  category: string;
  timeLimit: string;
}

interface SelectItem {
  name: string;
  value: string;
}

const mockDataCount: SelectItem[] = [
  {
    name: "5개",
    value: "5",
  },
  {
    name: "10개",
    value: "10",
  },
  {
    name: "15개",
    value: "15",
  },
  {
    name: "20개",
    value: "20",
  },
  {
    name: "30개",
    value: "30",
  },
];

const mockDataLevel: SelectItem[] = [
  {
    name: "상",
    value: "high",
  },
  {
    name: "중",
    value: "medium",
  },

  {
    name: "하",
    value: "low",
  },
];

const mockDataCategory: SelectItem[] = [
  {
    name: "랜덤",
    value: "random",
  },
  {
    name: "요즘 밈",
    value: "meme",
  },
  {
    name: "드라마",
    value: "drama",
  },
  {
    name: "영화",
    value: "movie",
  },
  {
    name: "만화",
    value: "comic",
  },
  {
    name: "넌센스",
    value: "nonsense",
  },
  {
    name: "신조어",
    value: "slang",
  },
  {
    name: "이모지",
    value: "emoji",
  },
  {
    name: "추억",
    value: "memory",
  },
];

const mockDataTime: SelectItem[] = [
  {
    name: "5초",
    value: "5",
  },
  {
    name: "10초",
    value: "10",
  },
  {
    name: "15초",
    value: "15",
  },
  {
    name: "20초",
    value: "20",
  },
  {
    name: "30초",
    value: "30",
  },
];

const Lobby = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalStep, setModalStep] = useState<"CREATE" | "WAITING" | "SUCCESS">(
    "CREATE"
  );
  const [isReady, setIsReady] = useState(false);
  const [roomData, setRoom] = useState<Room>({
    title: "",
    quizCount: "5",
    level: "high",
    category: "",
    timeLimit: "15",
  });
  const [badgeData, setBadgeData] = useState<string[]>([]);

  const onCreateBtnClick = () => {
    setModalStep("WAITING");
    setTimeout(() => {
      setModalStep("SUCCESS");
    }, 3000);
  };

  const onWaitCancelBtnClick = () => {
    setOpenModal(false);
  };

  const onReadyBtnClick = () => {
    setIsReady(!isReady);
  };

  const getModalContent = () => {
    switch (modalStep) {
      case "CREATE":
        return {
          title: "🕹️ 새 방 만들기",
          content: <CreateRoom />,
          closeButtonLabel: "취소",
          activeButton: (
            <Button
              text="생성"
              type="POSITIVE"
              onButtonClick={onCreateBtnClick}
            />
          ),
        };
      case "WAITING":
        return {
          content: <WaitForOpponent />,
          closeButtonLabel: "",
          activeButton: (
            <Button
              text="대기 취소"
              type="NEGATIVE"
              onButtonClick={onWaitCancelBtnClick}
            />
          ),
          height: 390,
        };
      case "SUCCESS":
        return {
          title: "🕹️ 대기중",
          content: <WaitForReady />,
          closeButtonLabel: "나가기",
          activeButton: isReady ? (
            <Button
              text="준비취소"
              type="NEGATIVE"
              onButtonClick={onReadyBtnClick}
            />
          ) : (
            <Button
              text="준비하기"
              type="POSITIVE"
              onButtonClick={onReadyBtnClick}
            />
          ),
          width: 400,
          height: 410,
        };
    }
  };

  const modalProps = getModalContent();

  return (
    <div className="Lobby">
      <Card className="rounded-[8px] w-95 h-95 flex items-center justify-between">
        <CardContent className="flex flex-col items-center">
          <p className="title">게임 시작하기</p>
          <Button
            type="CREATEROOM"
            text="🕹️ 새 방 만들기"
            onButtonClick={() => {
              setOpenModal(true);
              setModalStep("CREATE");
            }}
          />
          <div className="divider">
            <span className="divider-text">또는</span>
          </div>
          <Input
            className="!text-[18px] placeholder:text-[#AAAAAA] placeholder:text-center focus:border-none p-5.5 "
            placeholder={"코드 입력 (예: ABC123)"}
          />
        </CardContent>
        <CardFooter>
          <Button
            type="PARTICIPATE"
            text="🎉참가하기"
            onButtonClick={() => {}}
          />
        </CardFooter>
      </Card>

      {isOpenModal && (
        <BaseModal
          open={isOpenModal}
          onOpenChange={setOpenModal}
          title={modalProps.title}
          content={modalProps.content}
          closeButtonLabel={modalProps.closeButtonLabel}
          activeButton={modalProps.activeButton}
          height={modalProps.height}
          width={modalProps.width}
        />
      )}
    </div>
  );
};

export default Lobby;
