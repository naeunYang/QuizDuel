import { PrismaClient } from "@prisma/client";
import type { RoomOption } from "./room-options.types";

const prisma = new PrismaClient();

// async : 함수를 비동기 함수로 만들어주고 Promise를 반환하도록 변환해주는 키워드

export async function getRoomOptions(): Promise<RoomOption> {
  const [categories, counts, levels, times] = await Promise.all([
    // 모든 프로미스가 완료될 때까지 기다림, 하나라도 실패 시 전체가 reject됨.
    prisma.category.findMany(), // findMany()는 promise를 반환하는 것이고, await키워드가 작업 종료까지 기다린 후에 값을 담아주는 것이다.
    prisma.count.findMany({ orderBy: { countID: "asc" } }),
    prisma.level.findMany({ orderBy: { seq: "asc" } }),
    prisma.time.findMany({ orderBy: { timeID: "asc" } }),
  ]);

  return { categories, counts, levels, times };
}
