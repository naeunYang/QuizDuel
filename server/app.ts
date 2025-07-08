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

const app = express();

app.use(express.json()); // JSON 문자열로 들어오면 JSON 객체로 변환하여 req.body에 담아줌

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN, // http://localhost:5173 출처(origin)의 요청만 허용
  })
);

app.use("/home", homeRouter); // /home으로 진입하는 모든 요청을 homeRouter에 맡김

// 서버 실행, 포트 열기
app.listen(process.env.PORT, () => {
  console.log("**----------------------------------**");
  console.log("====      Server is On...!!!      ====");
  console.log("**----------------------------------**");
});
