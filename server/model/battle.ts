import { getRedisClient } from "../util/redisClient";

export async function getRoomInfos(roomCode: string) {
  try {
    const redis = await getRedisClient();
    const roomInfo = await redis.hGetAll(roomCode);

    // JSON.parse가 가능한 값만 파싱
    for (const key in roomInfo) {
      try {
        roomInfo[key] = JSON.parse(roomInfo[key]);
      } catch {
        // JSON.parse가 실패하면 그냥 문자열로 둠
      }
    }

    return roomInfo;
  } catch (error) {
    console.log("getRoomInfo 실패", error);
    throw new Error("Redis 조회 실패");
  }
}
