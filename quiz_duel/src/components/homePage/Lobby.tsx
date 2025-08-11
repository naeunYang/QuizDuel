import "./Lobby.css";
import { Card, CardContent, CardFooter } from "../shadcn/card";
import Button from "../common/Button";
import { Input } from "../shadcn/input";
import BaseModal from "../common/BaseModal";
import CreateRoom from "./CreateRoom";
import WaitForOpponent from "./WaitForOpponent";
import WaitForReady from "./WaitForReady";
import type { RoomInfo } from "@/components/homePage/types/roomInfo.types";
import connectWebSocket from "@/lib/connectWebSocket";
import LoadingModal from "../common/LoadingModal";
import type { ModalStep } from "./types/modal-step.types";
import type { RoonInfoContextType } from "./types/room-info-context.types";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BaseModal2 from "../common/BaseModal2";
import CreateRoomModal from "./popups/CreateRoomModal";
import WaitForOpponentModal from "./popups/WaitForOpponentModal";
import WaitForReadyModal from "./popups/WaitForReadyModal";
import { useSocket } from "../SocketProvider";

// roomInfo 초기값
const defaultRoomData: RoomInfo = {
  code: "",
  title: "진 사람 떡볶이 쏘기😎",
  quizCount: 5,
  level: "high",
  category: [],
  timeLimit: 15,
};

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
  const [modalStep1, setModalStep1] = useState<ModalStep>(null);
  const [room, setRoom] = useState<RoomInfo>(defaultRoomData);
  const [isReady, setIsReady] = useState(false); // 준비 상태
  const [isConnComplete, setIsConnComplete] = useState(false); // 소켓 연결 상태
  const [codeInput, setCodeInput] = useState(""); // 코드 입력 value 상태
  const codeInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null); // 소켓 객체
  const userIdRef = useRef<string>(crypto.randomUUID());
  const [socketErrorMsg, setSocketErrorMsg] = useState("");
  const [isOpenErrMsg, setIsOpenErrMsg] = useState(false);
  const [opponentState, setOpponentState] = useState(false);
  const [goToBattleUrl, setGoToBattleUrl] = useState("");
  const nav = useNavigate();
  const { subscribe, send } = useSocket();

  useEffect(() => {
    // window.location.search : 현재 url의 쿼리 스트링 부분 가져오기
    // new URLSearchParams() : key=value 구조로 파싱
    const params = new URLSearchParams(window.location.search);
    const roomCode = params.get("kakaoCode");

    if (roomCode) {
      connectWebSocket(
        wsRef,
        {
          type: "join",
          userId: userIdRef.current,
          roomCode: roomCode,
        },
        setIsConnComplete,
        setRoom,
        userIdRef.current,
        setSocketErrorMsg,
        setOpponentState,
        setIsOpenErrMsg,
        setGoToBattleUrl
      );

      window.history.replaceState({}, "", window.location.origin);
      // window.history : 사용자의 방문 기록에 접근하는 객체
      // .replaceState() : history 스택의 마지막 항목(현재 방문 기록)을 새 정보로 교체, 페이지를 새로고침하지 않고 주소만 바꾼다.
    }

    return () => {
      wsRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (socketErrorMsg) {
      setIsOpenErrMsg(true);
    }
  }, [socketErrorMsg]);

  useEffect(() => {
    if (!isOpenErrMsg) {
      setSocketErrorMsg("");

      setTimeout(() => {
        codeInputRef.current?.focus();
      }, 100);
    }
  }, [isOpenErrMsg]);

  // 팝업창 닫히면 값 초기화
  useEffect(() => {
    if (!isOpenModal) {
      setRoom(defaultRoomData);
      setModalStep(null);
      setIsReady(false);
    }
  }, [isOpenModal]);

  useEffect(() => {
    // 커넥션 완료되면 WAIT_READY창으로 이동
    if (isConnComplete) {
      setModalStep("WAIT_READY");
      setOpenModal(true);
    }
  }, [isConnComplete]);

  useEffect(() => {
    // 방 생성 후 code 값 세팅이 되면 WAIT_OPPONENT 창으로 이동
    if (modalStep === "CREATE" && room.code) {
      setModalStep("WAIT_OPPONENT");
    }
  }, [modalStep, room.code]);

  useEffect(() => {
    if (goToBattleUrl) {
      nav(goToBattleUrl);
    }
  }, [goToBattleUrl, nav]);

  useEffect(() => {
    const unsubscribe = subscribe((msg) => {
      if (msg.type === "room_not_found" || msg.type === "room_full") {
        setSocketErrorMsg(msg.message);
      } else if (msg.type === "all_users_joined") {
        if (msg.connCompleted) {
          console.log("모두 접속 완료");
          setModalStep1("WAIT_READY");

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

  // #region 이벤트 핸들러

  // CREATE - 새 방 만들기 버튼 클릭
  const onCreateRoomBtnClick = () => {
    setModalStep1("CREATE");
    setOpenModal(true);
  };

  // CREATE - 생성 버튼 클릭
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

    // 방 생성 및 입장
    connectWebSocket(
      wsRef,
      {
        type: "create",
      },
      setIsConnComplete,
      setRoom,
      userIdRef.current,
      setSocketErrorMsg,
      setOpponentState,
      setIsOpenErrMsg,
      setGoToBattleUrl
    );
  };

  // WAIT_OPPONENT - 대기 취소 버튼 클릭
  const onWaitCancelBtnClick = () => {
    setOpenModal(false);

    // 소켓 연결 해제
    if (wsRef.current && wsRef.current.OPEN) {
      wsRef.current.close();
      setIsConnComplete(false);
    }
  };

  // WAIT_READY - 준비 버튼 클릭
  const onReadyBtnClick = () => {
    // setIsReady(!Ready) 시 상태 변화가 비동기적으로 일어나기 때문에 readyState에 올바른 값이 안감
    // 따라서 아래와 같이 해결함
    const currentReady = !isReady;
    setIsReady(currentReady); // 준비 상태 토글

    // 준비 상태 서버에 전송
    connectWebSocket(
      wsRef,
      {
        type: "ready_status",
        roomCode: room.code,
        userId: userIdRef.current,
        isReady: currentReady,
      },
      setIsConnComplete,
      setRoom,
      userIdRef.current,
      setSocketErrorMsg,
      setOpponentState,
      setIsOpenErrMsg,
      setGoToBattleUrl
    );
  };

  // WAIT_READY - 나가기 버튼 클릭
  const onCloseButtonClick = () => {
    if (wsRef.current && wsRef.current.OPEN) {
      wsRef.current.close();
      setIsConnComplete(false);
    }
  };

  // 코드 입력 input
  const onCodeInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeInput(e.target.value);
  };

  const onCodeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && codeInput) {
      onPartiBtnClick();
    }
  };

  // 참가하기 버튼 클릭
  const onPartiBtnClick = () => {
    if (!codeInput) {
      setSocketErrorMsg("코드를 입력하세요!");

      return;
    } else if (
      codeInput.toUpperCase() === import.meta.env.VITE_ADMIN_ENTRY_CODE
    ) {
      nav("/admin");
      return;
    }

    // connectWebSocket(
    //   wsRef,
    //   {
    //     type: "join",
    //     userId: userIdRef.current,
    //     roomCode: codeInput.toUpperCase(),
    //   },
    //   setIsConnComplete,
    //   setRoom,
    //   userIdRef.current,
    //   setSocketErrorMsg,
    //   setOpponentState,
    //   setIsOpenErrMsg,
    //   setGoToBattleUrl
    // );

    send({
      type: "join",
      userId: userIdRef.current,
      roomCode: codeInput.toUpperCase(),
    });
  };

  //#endregion

  // 팝업창 content 설정
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
            <WaitForOpponent
              room={room}
              setIsConnComplete={setIsConnComplete}
            />
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
          content: (
            <WaitForReady isReady={isReady} opponentState={opponentState} />
          ),
          closeButtonLabel: "나가기",
          onCloseButtonClick: () => {
            onCloseButtonClick();
          },
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

  const renderStepModal = () => {
    switch (modalStep1) {
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
        <SetModalStepContext.Provider value={{ setModalStep: setModalStep1 }}>
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
              <Input
                ref={codeInputRef}
                value={codeInput}
                onChange={onCodeInputValueChange}
                onKeyDown={onCodeInputKeyDown}
                className="!text-[1.125rem] placeholder:text-[#AAAAAA] placeholder:text-center focus:border-none p-5.5 "
                placeholder={"코드 입력 (예: ABC123)"}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="PARTICIPATE"
                text="🎉참가하기"
                onButtonClick={onPartiBtnClick}
              />
            </CardFooter>
          </Card>

          {/* {isOpenModal && (
          <BaseModal
            open={isOpenModal}
            onOpenChange={setOpenModal}
            title={modalProps?.title}
            content={modalProps?.content}
            closeButtonLabel={modalProps?.closeButtonLabel}
            onCloseButtonClick={modalProps?.onCloseButtonClick}
            activeButton={modalProps?.activeButton}
            height={modalProps?.height}
            width={modalProps?.width}
          />
        )} */}

          {socketErrorMsg && (
            <LoadingModal
              open={isOpenErrMsg}
              content={socketErrorMsg}
              type={"ERROR"}
              onOpenChange={setIsOpenErrMsg}
            />
          )}
          <Button
            text="test"
            onButtonClick={onCreateRoomBtnClick}
            type="DEFAULT"
          />
          {isOpenModal && (
            <BaseModal2
              open={isOpenModal}
              setOpen={setOpenModal}
              userId={userIdRef.current}
            >
              {renderStepModal()}
            </BaseModal2>
          )}
        </SetModalStepContext.Provider>
      </RoomInfoContext.Provider>
    </div>
  );
};

export default Lobby;
