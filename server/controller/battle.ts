import type { Request, Response } from "express";
import * as battleData from "../model/battle";

export async function getRoomInfos(req: Request, res: Response) {
  try {
    const roomCode = req.params.code;

    const roomInfo = await battleData.getRoomInfos(roomCode);

    if (!roomInfo) {
      res.status(404).json({ message: "방 정보를 찾을 수 없습니다." });
      return;
    }

    res.json(roomInfo); // status 명시 안하면 자동으로 200
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류 발생" });
  }
}

export async function setRoomStatus(req: Request, res: Response) {
  try {
    const { code, status } = req.body;

    await battleData.setRoomStatus(code, status);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류 발생" });
  }
}

export async function setUserStatus(req: Request, res: Response) {
  try {
    const { code, userStatus } = req.body;

    await battleData.setUserStatus(code, userStatus);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류 발생" });
  }
}
