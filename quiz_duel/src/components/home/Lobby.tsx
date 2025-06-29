import "./Lobby.css";
import { Card, CardContent, CardFooter } from "../shadcn/card";
import Button from "../common/Button";
import { Input } from "../shadcn/input";
import BaseModal from "../common/BaseModal";
import CreateRoomContent from "./CreateRoomContent";

import { useState } from "react";

const Lobby = () => {
  const [isOpenModal, setOpenMoal] = useState(false);

  const onCreateBtnClick = () => {
    setOpenMoal(false);
  };

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
          title="🕹️ 새 방 만들기"
          content={<CreateRoomContent />}
          closeButtonLabel={"취소"}
          activeButton={
            <Button
              text="생성"
              type="POSITIVE"
              onButtonClick={onCreateBtnClick}
            />
          }
        />
      )}
    </div>
  );
};

export default Lobby;
