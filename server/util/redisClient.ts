import { createClient } from "redis";

const redisClient = createClient(); // default: 127.0.0.1, port: 6379

redisClient.on("error", (err: Error) => {
  console.error("Redis Client Error", err);
});

redisClient.on("connect", () => {
  console.error("Redis Client Connected");
});

export async function getRedisClient() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect(); // 연결
    }
  } catch (err) {
    console.log("Redis 연결 실패:", err);
    throw err; // 더 이상 진행하지 말고, 에러를 밖으로 던져라.
  }

  return redisClient;
}
