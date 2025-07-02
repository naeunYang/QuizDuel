import "./Lobby.css";
import { Card, CardContent, CardFooter } from "../shadcn/card";
import Button from "../common/Button";
import { Input } from "../shadcn/input";
import BaseModal from "../common/BaseModal";
import CreateRoom from "./CreateRoom";
import WaitForOpponent from "./WaitForOpponent";
import WaitForReady from "./WaitForReady";
import type { RoomInfo } from "@/types/room-info";

import { useState } from "react";

const Lobby = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalStep, setModalStep] = useState<"CREATE" | "WAITING" | "SUCCESS">(
    "CREATE"
  );
  const [room, setRoom] = useState<RoomInfo>({
    title: "",
    quizCount: "5",
    level: "high",
    category: [],
    timeLimit: "15",
  });

  const [isReady, setIsReady] = useState(false);

  // 생성 버튼 클릭
  const onCreateBtnClick = () => {
    setModalStep("WAITING");
    setTimeout(() => {
      setModalStep("SUCCESS");
    }, 3000);

    console.log(room);
  };

  // 대기 취소 버튼 클릭
  const onWaitCancelBtnClick = () => {
    setOpenModal(false);
  };

  // 준비 버튼 클릭
  const onReadyBtnClick = () => {
    setIsReady(!isReady);
  };

  const getModalContent = () => {
    switch (modalStep) {
      case "CREATE":
        return {
          title: "🕹️ 새 방 만들기",
          content: <CreateRoom room={room} setRoom={setRoom} />,
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
