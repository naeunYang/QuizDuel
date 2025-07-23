import { getRedisClient } from "../util/redisClient";
import type { RoomInfo } from "../types/room-info.type";

export default async function getRoom(
  roomCode: string
): Promise<RoomInfo["users"]> {
  try {
    const redis = await getRedisClient();
    const result = await redis.hGet(roomCode, "users");

    let users;

    if (result) {
      users = JSON.parse(result);
    }

    return users;
  } catch (err) {
    console.log("getRoom 실패: ", err);

    return [];
  }
}
