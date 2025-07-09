// import express from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const app = express();
// const PORT = 3001;

// // 모든 요청에 대해 JSON 바디를 파싱하는 미들웨어 등록
// // -> JSON 문자열로 들어오면 JSON 객체로 변환하여 req.body에 담아줌
// app.use(express.json());

// // req: 클라이언트에서 서버로 온 요청 정보
// // res: 서버가 클라이언트에서 응답할 때 사용
// app.get("/", (req, res) => {
//   res.send("Hello from Server");
// });

// app.get("/get", async (req, res) => {
//   const allCategories = await prisma.category.findMany();
//   res.send(allCategories);
// });

// // 서버 실행, 포트 열기
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import homeRouter from "./routes/home";
import http from "http";
import WebSocket from "ws";

const app = express();

app.use(express.json()); // JSON 문자열로 들어오면 JSON 객체로 변환하여 req.body에 담아줌

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN, // http://localhost:5173 출처(origin)의 요청만 허용
  })
);

app.use("/home", homeRouter); // /home으로 진입하는 모든 요청을 homeRouter에 맡김

// http 서버
const server = http.createServer(app);

// WebSocket 서버, 기존 HTTP 서버에 WebSocket 서버 기능을 붙임
// -> 일반적인 요청은 Express가 처리, WebSocket 요청은 wss가 가로채서 처리
const wss = new WebSocket.Server({ server }); // 이 WebSocket 서버는 server 서버에 붙일게
// => 이 두 개의 서버가 같은 포트에서 동시에 작동 가능

// .on : 이벤트 핸들러를 등록하는 메서드
wss.on("connection", (ws) => {
  // connection : 클라이언트가 접속 성공했을 때 발생
  // ws : 방금 연결된 그 한 클라이언트와 통신할 수 있는 WebSocket 연결 객체
  console.log("웹소켓 연결됨!");

  // message : 클라이언트가 서버에게 메시지를 보냈을 때 실행되는 이벤트
  ws.on("message", (msg) => {
    console.log("받은 메시지:", msg.toString());
    ws.send("서버가 응답했어요!"); // 서버가 클라이언트에게 메시지를 보냄
  });
});

// http + websocket 서버 실행, 포트 열기
server.listen(process.env.PORT, () => {
  console.log("**----------------------------------**");
  console.log("====      Server is On...!!!      ====");
  console.log("**----------------------------------**");
});
