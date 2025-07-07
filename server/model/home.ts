import { PrismaClient } from "@prisma/client";
import type { RoomOption } from "./room-options.types";

const prisma = new PrismaClient();

export async function getRoomOptions(): Promise<RoomOption> {
  const [categories, counts, levels, times] = await Promise.all([
    prisma.category.findMany(),
    prisma.count.findMany(),
    prisma.level.findMany(),
    prisma.time.findMany(),
  ]);

  return { categories, counts, levels, times };
}
