import express from "express";

const app = express();
const PORT = 3001;

// 모든 요청에 대해 JSON 바디를 파싱하는 미들웨어 등록
// -> JSON 문자열로 들어오면 JSON 객체로 변환하여 req.body에 담아줌
app.use(express.json());

// req: 클라이언트에서 서버로 온 요청 정보
// res: 서버가 클라이언트에서 응답할 때 사용
app.get("/", (req, res) => {
  res.send("Hello from Server");
});

type Data = {
  name: string;
  age: number;
  url: string;
};

const sendData: Data = {
  name: "양나은",
  age: 28,
  url: "naeun.com",
};

app.get("/get", (req, res) => {
  res.send(sendData);
});

// 서버 실행, 포트 열기
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
