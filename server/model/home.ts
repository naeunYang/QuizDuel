import { PrismaClient } from "@prisma/client";
import { getRedisClient } from "../util/redisClient";
import type { RoomOption } from "../types/room-options.type";

const prisma = new PrismaClient();

// 방 생성 시 옵션 아이템들 가져오기
export async function getRoomOptions(): Promise<RoomOption> {
  const [categories, counts, levels, times] = await Promise.all([
    // 모든 프로미스가 완료될 때까지 기다림, 하나라도 실패 시 전체가 reject됨.
    prisma.category_master.findMany(), // findMany()는 promise를 반환하는 것이고, await키워드가 작업 종료까지 기다린 후에 값을 담아주는 것이다.
    prisma.count_master.findMany({ orderBy: { seq: "asc" } }),
    prisma.level_master.findMany({ orderBy: { seq: "asc" } }),
    prisma.time_master.findMany({ orderBy: { seq: "asc" } }),
  ]);

  return { categories, counts, levels, times };
}

// 모든 유저 준비 완료 후 문제 리스트 세팅을 위해 퀴즈 정보를 추출
export async function getQuizSettings(code: string) {
  try {
    const redis = await getRedisClient();

    const level = await redis.hGet(code, "level");
    const quizCount = await redis.hGet(code, "quizCount");
    const category = await redis.hGet(code, "category");

    let count;
    if (quizCount) {
      count = await prisma.count_master.findFirst(JSON.parse(quizCount));
    }

    const quizInfo = {
      level: level ? JSON.parse(level) : null,
      quizCount: count?.countName,
      category: category ? JSON.parse(category) : null,
    };

    return quizInfo;
  } catch (error) {
    console.log("getQuizSettings 실패", error);
    throw new Error("Redis 조회 실패");
  }
}
