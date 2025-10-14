// React Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "@/context/SocketProvider";
import { useRoomInfoValueContext } from "@/context/RoomInfoProvider";
import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

// 컴포넌트
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../shadcn/dialog";
import Button from "@/components/common/Button";
import WaitForReady from "./WaitForReady";
import LoadingModal from "@/components/common/LoadingModal";

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
}

const WaitForReadyModal = ({ setOpen, userId }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [opponentState, setOpponentState] = useState(false);
  const room = useRoomInfoValueContext();
  const { subscribe, send } = useSocket();
  const nav = useNavigate();

  const roomSetting = async () => {
    setIsLoading(false);

    try {
      // 퀴즈 옵션 정보 가져오기
      const { data: quizSettings } = await axios(
        `/api/home/quiz-settings/${room.code}`
      );
      const { level, quizCount, category } = quizSettings;

      // "5개" 형식으로 가져오기 때문에 "개"를 제거 후 숫자 변환
      const limitCount = Number(quizCount.slice(0, -1) || 0);

      const { data: quizIds, error } = await supabase
        .from("quiz_master")
        .select("id")
        .eq("levelID", level)
        .eq("categoryID", category)
        .order("RANDOM()", { ascending: true }) // 랜덤 정렬
        .limit(limitCount);
      console.log(quizIds);

      if (error) throw error;
    } catch (error) {
      console.error("roomSetting error: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribe(async (msg) => {
      if (msg.type === "all_ready" && msg.isAllReady) {
        console.log("준비 전부 완료");
        setIsLoading(true);
        await roomSetting();

        // nav(`/battle/${msg.roomCode}`);
      } else if (msg.type === "opponent_ready_state") {
        setOpponentState(msg.isOpponentReady);
      } else if (msg.type === "opponent_quit") {
        setOpponentState(false);
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const onCloseButtonClick = () => {
    setOpen?.(false);
    send({
      type: "exit",
    });
  };

  const onReadyBtnClick = () => {
    // setIsReady(!Ready) 시 상태 변화가 비동기적으로 일어나기 때문에 readyState에 올바른 값이 안감
    // 따라서 아래와 같이 해결함
    const currentReady = !isReady;
    setIsReady(currentReady);

    send({
      type: "ready_status",
      roomCode: room.code,
      userId: userId!,
      isReady: currentReady,
    });
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="text-center text-xl">🕹️ 대기중</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="h-full mt-3 mb-10">
        <WaitForReady isReady={isReady} opponentState={opponentState} />
      </div>

      <DialogFooter className="flex flex-row !justify-center gap-3">
        <Button
          text="나가기"
          type="NEGATIVE"
          onButtonClick={onCloseButtonClick}
        />
        {isReady ? (
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
        )}
      </DialogFooter>
      <LoadingModal
        content="방 설정중..."
        open={isLoading}
        type="LOADING"
        className="[&>button]:hidden"
      />
    </div>
  );
};

export default WaitForReadyModal;
