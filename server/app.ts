import express from "express";
import cors from "cors";
import homeRouter from "./routes/home";
import adminRouter from "./routes/admin";
import battleRouter from "./routes/battle";
import http from "http";
import WebSocket from "ws";
import connectionSocket from "./websocket/connection";
import { getRedisClient } from "./util/redisClient";

const app = express();

app.use(express.json()); // JSON 문자열로 들어오면 JSON 객체로 변환하여 req.body에 담아줌

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN, // http://localhost:5173 출처(origin)의 요청만 허용
  })
);

app.use("/api/home", homeRouter); // /home으로 진입하는 모든 요청을 homeRouter에 맡김
app.use("/api/admin", adminRouter);
app.use("/api/battle", battleRouter);

// http 서버
const server = http.createServer(app);

// WebSocket 서버, 기존 HTTP 서버에 WebSocket 서버 기능을 붙임
// -> 일반적인 요청은 Express가 처리, WebSocket 요청은 wss가 가로채서 처리
const wss = new WebSocket.Server({ server }); // 이 WebSocket 서버를 server 서버에 붙임
// => 이 두 개의 서버가 같은 포트에서 동시에 작동 가능

// 소켓 연결 작업
connectionSocket(wss);

// http + websocket 서버 실행, 포트 열기
server.listen(process.env.PORT, () => {
  console.log("**----------------------------------**");
  console.log("====      Server is On...!!!      ====");
  console.log("**----------------------------------**");
});

// 서버 종료 시 Redis 연결 해제
process.on("SIGINT", async () => {
  const redis = await getRedisClient();

  if (redis.isOpen) {
    await redis.disconnect();
    console.log("Redis Client Connection closed");
  }

  // 서버 종료
  process.exit(0);
});
