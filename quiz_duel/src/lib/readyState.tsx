export default function readyState(
  ws: WebSocket,
  roomCode: string,
  userId: string,
  isReady: boolean
) {
  ws.send(
    JSON.stringify({
      type: "ready_status",
      roomCode: roomCode,
      userId: userId,
      isReady: isReady,
    })
  );

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.type === "all_ready") {
      if (data.isAllReady) {
        // 페이지 이동
        console.log("준비 전부 완료");
      }
    } else if (data.type === "opponent_ready_state") {
      // console.log(data);
    }
  };
}
