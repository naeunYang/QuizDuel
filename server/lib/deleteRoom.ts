import { getRedisClient } from "../util/redisClient";

export default async function deleteRoom(roomCode: string) {
  try {
    const redis = await getRedisClient();

    await redis.del(roomCode);
  } catch (err) {
    console.log("deleteRoom 실패: ", err);
  }
}
