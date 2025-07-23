export default function readyState(
  ws: WebSocket,
  userId: string,
  isReady: boolean
) {
  ws.send(
    JSON.stringify({
      type: "ready_status",
      userId: userId,
      isReady: isReady,
    })
  );

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
  };
}
