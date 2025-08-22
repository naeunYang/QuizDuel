import type { Request, Response } from "express";
import * as homeData from "../model/home";

export async function getRoomOptions(req: Request, res: Response) {
  try {
    const data = await homeData.getRoomOptions(); // promise가 완료될 때까지 기다린 후, resolve된 값을 담는다.
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "방 옵션을 불러오는 중 오류 발생" });
  }
}
