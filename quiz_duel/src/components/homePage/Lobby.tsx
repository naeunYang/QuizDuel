import "./Lobby.css";
import { Card, CardContent, CardFooter } from "../shadcn/card";
import Button from "../common/Button";
import { Input } from "../shadcn/input";
import BaseModal from "../common/BaseModal";
import CreateRoom from "./CreateRoom";
import WaitForOpponent from "./WaitForOpponent";
import WaitForReady from "./WaitForReady";
import type { RoomInfo } from "@/types/roomInfo.types";

import { useEffect, useState, useRef } from "react";

// 방 초기값
const defaultRoomData: RoomInfo = {
  code: "",
  title: "진 사람 떡볶이 쏘기😎",
  quizCount: 5,
  level: "high",
  category: [],
  timeLimit: 15,
};

// 초기 팝업창
const defaultPopup: "CREATE" | "WAIT_OPPONENT" | "WAIT_READY" = "CREATE";

const Lobby = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalStep, setModalStep] = useState<
    "CREATE" | "WAIT_OPPONENT" | "WAIT_READY"
  >(defaultPopup);
  const [room, setRoom] = useState<RoomInfo>(defaultRoomData);
  const [isReady, setIsReady] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // 팝업창 닫히면 값 초기화
  useEffect(() => {
    if (!isOpenModal) {
      setRoom(defaultRoomData);
      setModalStep(defaultPopup);
      if (timer.current) clearTimeout(timer.current);
    }
  }, [isOpenModal]);

  // 생성 버튼 클릭
  const onCreateBtnClick = () => {
    // 카테고리 선택 X 시 random값으로 설정
    if (room.category.length === 0) {
      setRoom((prev) => {
        return {
          ...prev,
          ["category"]: ["random"],
        };
      });
    }

    // 방 제목 비었을 경우 기본값으로 설정
    if (room.title === "") {
      setRoom((prev) => {
        return {
          ...prev,
          ["title"]: defaultRoomData.title,
        };
      });
    }

    // 방 생성 후 코드 생성
    setRoom((prev) => {
      return {
        ...prev,
        ["code"]: "YNE123",
      };
    });

    // 임시) 대기 화면 이동 후, 3초 후
    setModalStep("WAIT_OPPONENT");
    // timer.current = setTimeout(() => {
    //   setModalStep("WAIT_READY");
    // }, 3000);
  };

  // 대기 취소 버튼 클릭
  const onWaitCancelBtnClick = () => {
    setOpenModal(false);
  };

  // 준비 버튼 클릭
  const onReadyBtnClick = () => {
    setIsReady(!isReady); // 준비 상태 토글
  };

  // 팝업창 content
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
          height: 430,
        };
      case "WAIT_OPPONENT":
        return {
          content: (
            <WaitForOpponent roomTitle={room.title} roomCode={room.code} />
          ),
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
      case "WAIT_READY":
        return {
          title: "🕹️ 대기중",
          content: <WaitForReady isReady={isReady} />,
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
            onButtonClick={() => setOpenModal(true)}
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
