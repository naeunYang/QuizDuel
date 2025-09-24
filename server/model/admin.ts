import { GoogleGenerativeAI } from "@google/generative-ai";
import geminiPrompt from "./gemini_prompt";
import { PrismaClient } from "@prisma/client";

import type { Response } from "express";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const prisma = new PrismaClient();

export async function generateQuiz(
  type: string,
  category: string,
  level: string,
  cnt: string,
  res: Response
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // 카테고리 정보 불러오기
  const categories = await prisma.category_master.findMany();
  // 퀴즈 리스트 불러오기
  const quizList = await prisma.quiz_master.findMany({
    select: { content: true },
  });

  res.write(`data: ${JSON.stringify("prompt 전송중...\n\n")}\n\n`);
  const result = await model.generateContentStream(
    geminiPrompt(type, category, level, cnt, categories, quizList)
  );

  let text = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();

    console.log(chunkText);
    res.write(`data: ${JSON.stringify(chunkText)}\n\n`);
    text += chunkText;
  }

  const data = JSON.parse(text);
  res.write(`event: end\ndata: ${JSON.stringify(data)}\n\n`);
  res.end();
}
