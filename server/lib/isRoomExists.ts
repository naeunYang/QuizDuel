import { getRedisClient } from "../util/redisClient";

export default async function isRoomExists(roomCode: string) {
  try {
    const redis = await getRedisClient();
    const isExists = await redis.exists(roomCode);

    if (isExists) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("isRoomExists 실패: ", err);
  }
}
