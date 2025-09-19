import type { Request, Response } from "express";
import * as adminData from "../model/admin";

export async function generateQuiz(req: Request, res: Response) {
  try {
    const { type, category, level, cnt } = req.query;

    const data = await adminData.generateQuiz(
      type as string,
      category as string,
      level as string,
      cnt as string
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "문제 생성 중 오류 발생" });
  }
}
