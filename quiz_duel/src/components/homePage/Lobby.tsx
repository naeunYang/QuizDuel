import "./Lobby.css";
import { Card, CardContent, CardFooter } from "../shadcn/card";
import Button from "../common/Button";
import { Input } from "../shadcn/input";
import BaseModal from "../common/BaseModal";
import CreateRoom from "./CreateRoom";
import WaitForOpponent from "./WaitForOpponent";
import WaitForReady from "./WaitForReady";

import { useState } from "react";

const Lobby = () => {
  const [isOpenModal, setOpenMoal] = useState(false);
  const [modalStep, setModalStep] = useState<"CREATE" | "WAITING" | "SUCCESS">(
    "SUCCESS"
  );

  const onCreateBtnClick = () => {
    setModalStep("WAITING");
  };

  const onWaitCancelBtnClick = () => {
    setOpenMoal(false);
  };

  const onExitBtnClick = () => {};

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
          activeButton: (
            <Button
              text="준비하기"
              type="POSITIVE"
              onButtonClick={onExitBtnClick}
            />
          ),
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
              setOpenMoal(true);
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
          onOpenChange={setOpenMoal}
          title={modalProps.title}
          content={modalProps.content}
          closeButtonLabel={modalProps.closeButtonLabel}
          activeButton={modalProps.activeButton}
          height={modalProps.height}
        />
      )}
    </div>
  );
};

export default Lobby;
