import "./Lobby.css";

// React Hooks
import { useEffect, useState, useRef, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../SocketProvider";

// 컴포넌트
import { Card, CardContent, CardFooter } from "../shadcn/card";
import Button from "../common/Button";
import LoadingModal from "../common/LoadingModal";
import BaseModal from "../common/BaseModal";
import CreateRoomModal from "./popups/CreateRoomModal";
import WaitForOpponentModal from "./popups/WaitForOpponentModal";
import WaitForReadyModal from "./popups/WaitForReadyModal";
import CodeInput from "./CodeInput";

// type
import type { RoomInfo } from "@/components/homePage/types/roomInfo.types";
import type { ModalStep } from "./types/modal-step.types";
import type { RoonInfoContextType } from "./types/room-info-context.types";

// roomInfo 초기값
const defaultRoomData: RoomInfo = {
  code: "",
  title: "진 사람 떡볶이 쏘기😎",
  quizCount: 5,
  level: "high",
  category: [],
  timeLimit: 15,
};

// Context
const RoomInfoContext = createContext<RoonInfoContextType | null>(null);

export function useRoomInfoContext() {
  const value = useContext(RoomInfoContext);
  if (!value) throw new Error("RoomInfoContext에 문제가 있음");
  return value;
}

const SetModalStepContext = createContext<{
  setModalStep: React.Dispatch<React.SetStateAction<ModalStep>>;
} | null>(null);

export function useSetModalStepContext() {
  const value = useContext(SetModalStepContext);
  if (!value) throw new Error("ModalStepContext에 문제가 있음");
  return value;
}

const Lobby = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalStep, setModalStep] = useState<ModalStep>(null);
  const [socketErrorMsg, setSocketErrorMsg] = useState("");
  const [isOpenErrMsg, setIsOpenErrMsg] = useState(false);
  const [room, setRoom] = useState<RoomInfo>(defaultRoomData);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<string>(crypto.randomUUID());
  const nav = useNavigate();
  const { subscribe, send, isConnected } = useSocket();

  useEffect(() => {
    // window.location.search : 현재 url의 쿼리 스트링 부분 가져오기
    // new URLSearchParams() : key=value 구조로 파싱
    const params = new URLSearchParams(window.location.search);
    const roomCode = params.get("kakaoCode");

    if (roomCode && isConnected) {
      send({
        type: "join",
        userId: userIdRef.current,
        roomCode: roomCode,
      });

      window.history.replaceState({}, "", window.location.origin);
      // window.history : 사용자의 방문 기록에 접근하는 객체
      // .replaceState() : history 스택의 마지막 항목(현재 방문 기록)을 새 정보로 교체, 페이지를 새로고침하지 않고 주소만 바꾼다.
    }
  }, [isConnected]);

  useEffect(() => {
    const unsubscribe = subscribe((msg) => {
      if (msg.type === "room_not_found" || msg.type === "room_full") {
        setSocketErrorMsg(msg.message);
      } else if (msg.type === "all_users_joined") {
        if (msg.connCompleted) {
          console.log("모두 접속 완료");
          setModalStep("WAIT_READY");

          if (!room.code) {
            setRoom((prev) => {
              return {
                ...prev,
                ["code"]: msg.roomCode,
              };
            });
          }

          setOpenModal(true);
        }
      }
    });

    return unsubscribe;
  }, [subscribe]);

  useEffect(() => {
    if (socketErrorMsg) {
      setIsOpenErrMsg(true);
    }
  }, [socketErrorMsg]);

  useEffect(() => {
    if (!isOpenErrMsg) {
      codeInputRef.current?.focus(); // 에러 메세지 출력 후 코드 input에 포커스 주기
      setSocketErrorMsg("");
      setIsOpenErrMsg(false);
    }
  }, [isOpenErrMsg]);

  useEffect(() => {
    // 팝업 닫히면 값 초기화
    if (!isOpenModal) {
      setRoom(defaultRoomData);
    }
  }, [isOpenModal]);

  // #region 이벤트 핸들러

  // CREATE - 새 방 만들기 버튼 클릭
  const onCreateRoomBtnClick = () => {
    setModalStep("CREATE");
    setOpenModal(true);
  };

  // 참가하기 버튼 클릭
  const onPartiBtnClick = () => {
    if (codeInputRef.current) {
      codeInputSubmit(codeInputRef.current.value);
    }
  };

  const codeInputSubmit = (code: string) => {
    if (!code) {
      setSocketErrorMsg("코드를 입력하세요!");

      return;
    } else if (code.toUpperCase() === import.meta.env.VITE_ADMIN_ENTRY_CODE) {
      nav("/admin");
      return;
    }

    send({
      type: "join",
      userId: userIdRef.current,
      roomCode: code.toUpperCase(),
    });
  };

  //#endregion

  const renderStepModal = () => {
    switch (modalStep) {
      case "CREATE":
        return <CreateRoomModal />;
      case "WAIT_OPPONENT":
        return <WaitForOpponentModal />;
      case "WAIT_READY":
        return <WaitForReadyModal />;
      default:
        return <></>;
    }
  };

  return (
    <div className="Lobby">
      <RoomInfoContext.Provider value={{ room, setRoom }}>
        <SetModalStepContext.Provider value={{ setModalStep: setModalStep }}>
          <Card className="rounded-[0.5rem] w-95 h-95 flex items-center justify-between">
            <CardContent className="flex flex-col items-center">
              <p className="title">게임 시작하기</p>
              <Button
                type="CREATEROOM"
                text="🕹️ 새 방 만들기"
                onButtonClick={onCreateRoomBtnClick}
              />
              <div className="divider">
                <span className="divider-text">또는</span>
              </div>
              <CodeInput ref={codeInputRef} codeInputSubmit={codeInputSubmit} />
            </CardContent>
            <CardFooter>
              <Button
                type="PARTICIPATE"
                text="🎉참가하기"
                onButtonClick={onPartiBtnClick}
              />
            </CardFooter>
          </Card>

          {isOpenModal && (
            <BaseModal
              open={isOpenModal}
              setOpen={setOpenModal}
              userId={userIdRef.current}
            >
              {renderStepModal()}
            </BaseModal>
          )}

          {socketErrorMsg && (
            <LoadingModal
              open={isOpenErrMsg}
              content={socketErrorMsg}
              type={"ERROR"}
              onOpenChange={setIsOpenErrMsg}
            />
          )}
        </SetModalStepContext.Provider>
      </RoomInfoContext.Provider>
    </div>
  );
};

export default Lobby;
