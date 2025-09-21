import type { Request, Response } from "express";
import * as adminData from "../model/admin";

export async function generateQuiz(req: Request, res: Response) {
  try {
    // SSE 헤더 세팅
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const { type, category, level, cnt } = req.query;

    // model에서 스트리밍 처리 시작
    await adminData.generateQuiz(
      type as string,
      category as string,
      level as string,
      cnt as string,
      res
    );

    // 클라이언트가 연결 끊음.
    req.on("close", () => {
      console.log("SSE connection closed by client");
    });
  } catch (err) {
    console.log(err);
    res.end("event: error\ndata: 문제 생성 중 오류 발생\n\n");
  }
}
