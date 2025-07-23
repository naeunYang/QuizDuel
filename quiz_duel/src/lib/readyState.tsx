export default function readyState(
  ws: WebSocket,
  roomCode: string,
  userId: string,
  isReady: boolean
) {
  console.log(`[${roomCode}]: ${userId} - ${isReady}`);
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
  };
}
