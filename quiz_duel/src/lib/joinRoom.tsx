export default function joinRoom(
  ws: WebSocket,
  roodCode: string,
  userId: string,
  setIsConnComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setSocketErrorMsg?: React.Dispatch<React.SetStateAction<string>>
) {
  ws.send(
    JSON.stringify({
      type: "join",
      userId: userId,
      roomCode: roodCode,
    })
  );

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    switch (data.type) {
      case "ready":
        if (data.connCompleted) {
          console.log("모두 접속 완료");
          setIsConnComplete(data.connCompleted);
        }
        return;
      case "room_not_found":
        if (setSocketErrorMsg) {
          setSocketErrorMsg(data.message);
        }
        console.log(data.message);
        return;
      case "room_full":
        if (setSocketErrorMsg) {
          setSocketErrorMsg(data.message);
        }
        console.log(data.message);
        return;
      default:
        return;
    }
  };
}
