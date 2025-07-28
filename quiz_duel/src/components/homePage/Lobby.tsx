import "./Lobby.css";
import { Card, CardContent, CardFooter } from "../shadcn/card";
import Button from "../common/Button";
import { Input } from "../shadcn/input";
import BaseModal from "../common/BaseModal";
import CreateRoom from "./CreateRoom";
import WaitForOpponent from "./WaitForOpponent";
import WaitForReady from "./WaitForReady";
import type { RoomInfo } from "@/types/roomInfo.types";
import createRoom from "@/lib/createRoom";
import joinRoom from "@/lib/joinRoom";
import readyState from "@/lib/readyState";
import LoadingModal from "../common/LoadingModal";

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

// 팝업창 초기값
const defaultPopup: "CREATE" | "WAIT_OPPONENT" | "WAIT_READY" = "CREATE";

// 소켓 연결(방 생성 시, 참가 시)
const socketUrl = "ws://localhost:3001";
function connectWebSocket(
  wsRef: React.RefObject<WebSocket | null>,
  onConnected: () => void,
  setSocketErrorMsg?: React.Dispatch<React.SetStateAction<string>>
) {
  // wsRef.current = new WebSocket("ws://localhost:3001"); 으로 연결을 시도하는 순간 onopen이벤트가 동작함
  // 따라서 WebSocket 생성 직후 즉시 등록해야 한다.

  if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
    wsRef.current = new WebSocket(socketUrl); // 소켓 연결 요청

    wsRef.current.onopen = () => {
      onConnected();
    };

    wsRef.current.onerror = (e) => {
      console.error("WebSocket error:", e);
      if (setSocketErrorMsg) {
        setSocketErrorMsg("서버 연결 중 오류가 발생했습니다.");
      }
    };
  } else if (wsRef.current.readyState === WebSocket.CONNECTING) {
    // 연결 중일때는 onopen 이벤트를 기다림
    wsRef.current.onopen = () => {
      onConnected();
    };
  } else if (wsRef.current.readyState === WebSocket.OPEN) {
    onConnected();
  }
}

const Lobby = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalStep, setModalStep] = useState<
    "CREATE" | "WAIT_OPPONENT" | "WAIT_READY"
  >(defaultPopup);
  const [room, setRoom] = useState<RoomInfo>(defaultRoomData);
  const [isReady, setIsReady] = useState(false); // 준비 상태
  const [isConnComplete, setIsConnComplete] = useState(false); // 소켓 연결 상태
  const [codeInput, setCodeInput] = useState(""); // 코드 입력 value 상태
  const wsRef = useRef<WebSocket | null>(null); // 소켓 객체
  const userIdRef = useRef<string>(crypto.randomUUID());
  const [socketErrorMsg, setSocketErrorMsg] = useState("");
  const [isOpenErrMsg, setIsOpenErrMsg] = useState(false);

  useEffect(() => {
    // window.location.search : 현재 url의 쿼리 스트링 부분 가져오기
    // new URLSearchParams() : key=value 구조로 파싱
    const params = new URLSearchParams(window.location.search);
    const roomCode = params.get("kakaoCode");

    if (roomCode) {
      connectWebSocket(
        wsRef,
        () => {
          joinRoom(
            wsRef.current!,
            roomCode!,
            userIdRef.current,
            setIsConnComplete,
            setSocketErrorMsg,
            setRoom
          );
        },
        setSocketErrorMsg
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
    }
  }, [isOpenErrMsg]);

  // 팝업창 닫히면 값 초기화
  useEffect(() => {
    if (!isOpenModal) {
      setRoom(defaultRoomData);
      setModalStep(defaultPopup);
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

  // #region 이벤트 핸들러

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
      () => {
        createRoom(
          wsRef.current!,
          setRoom,
          userIdRef.current,
          setIsConnComplete
        );
      },
      setSocketErrorMsg
    );

    setModalStep("WAIT_OPPONENT");
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
      () => {
        readyState(wsRef.current!, room.code, userIdRef.current, currentReady);
      },
      setSocketErrorMsg
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

  // 코드 입력 input
  const onCodeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onPartiBtnClick();
    }
  };

  // 참가하기 버튼 클릭
  const onPartiBtnClick = () => {
    if (!codeInput) {
      setSocketErrorMsg("코드를 입력하세요!");
      return;
    }

    connectWebSocket(
      wsRef,
      () => {
        joinRoom(
          wsRef.current!,
          codeInput,
          userIdRef.current,
          setIsConnComplete,
          setSocketErrorMsg,
          setRoom
        );
      },
      setSocketErrorMsg
    );
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
          content: <WaitForReady isReady={isReady} />,
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
            value={codeInput}
            onChange={onCodeInputValueChange}
            onKeyDown={onCodeInputKeyDown}
            className="!text-[18px] placeholder:text-[#AAAAAA] placeholder:text-center focus:border-none p-5.5 "
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

      {isOpenModal && (
        <BaseModal
          open={isOpenModal}
          onOpenChange={setOpenModal}
          title={modalProps.title}
          content={modalProps.content}
          closeButtonLabel={modalProps.closeButtonLabel}
          onCloseButtonClick={modalProps.onCloseButtonClick}
          activeButton={modalProps.activeButton}
          height={modalProps.height}
          width={modalProps.width}
        />
      )}

      {socketErrorMsg && (
        <LoadingModal
          open={isOpenErrMsg}
          content={socketErrorMsg}
          type={"ERROR"}
          onOpenChange={setIsOpenErrMsg}
        />
      )}
    </div>
  );
};

export default Lobby;
