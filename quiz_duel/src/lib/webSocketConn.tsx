function webSocketConn(
  roodCode: string,
  setIsConnComplete: React.Dispatch<React.SetStateAction<boolean>>
) {
  const ws = new WebSocket("ws://localhost:3001"); // 소켓 연결 요청

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        // JSON.stringify : 객체 -> String으로 변환, 메시지는 문자열만 보낼 수 있기 때문
        type: "join",
        userId: crypto.randomUUID(), // user 식별자 생성 후 전달(userId)
        roomCode: roodCode,
      })
    );
  };

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.type === "ready") {
      if (data.connCompleted) {
        console.log("모두 접속 완료");
        setIsConnComplete(data.connCompleted);
      }
    }
  };
}

export default webSocketConn;
