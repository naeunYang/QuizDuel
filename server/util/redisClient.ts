import { createClient } from "redis";

const redisClient = createClient(); // default: 127.0.0.1, port: 6379

redisClient.on("error", (err: Error) => {
  console.error("Redis Client Error", err);
});

export async function getRedisClient() {
  if (!redisClient.isOpen) {
    await redisClient.connect(); // 연결
  }

  return redisClient;
}
