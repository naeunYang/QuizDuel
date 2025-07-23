import { RoomInfo } from "../types/room-info.type";
import { getRedisClient } from "../util/redisClient";

export default async function saveRoom(roomInfo: RoomInfo) {
  try {
    const redis = await getRedisClient();

    await redis.hSet(roomInfo.roomCode, {
      users: JSON.stringify(roomInfo.users),
    });
  } catch (err) {
    console.log("saveRoom 실패: ", err);
  }
}
