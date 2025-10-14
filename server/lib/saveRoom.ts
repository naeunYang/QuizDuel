import { RoomInfo } from "../types/room-info.type";
import { getRedisClient } from "../util/redisClient";

export default async function saveRoom(roomInfo: RoomInfo) {
  try {
    const redis = await getRedisClient();

    // 최초 생성
    if (roomInfo.title) {
      await redis.hSet(roomInfo.roomCode, {
        title: JSON.stringify(roomInfo.title),
        quizCount: JSON.stringify(roomInfo.quizCount),
        level: JSON.stringify(roomInfo.level),
        category: JSON.stringify(roomInfo.category),
        timeLimit: JSON.stringify(roomInfo.timeLimit),
        users: JSON.stringify(roomInfo.users),
        status: JSON.stringify(roomInfo.status),
      });
    }
    // 이미 존재하는 방에 join 시
    else {
      await redis.hSet(roomInfo.roomCode, {
        users: JSON.stringify(roomInfo.users),
      });
    }
  } catch (err) {
    console.log("saveRoom 실패: ", err);
  }
}
