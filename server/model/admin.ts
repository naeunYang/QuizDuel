import { GoogleGenerativeAI } from "@google/generative-ai";
import geminiPrompt from "./gemini_prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateQuiz(
  type: string,
  category: string,
  level: string,
  cnt: string
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(
    geminiPrompt(type, category, level, cnt)
  );
  const response = result.response;
  const text = response.text();

  console.log(text);
  return JSON.parse(text);

  //   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  //   const result = await model.generateContentStream(
  //     geminiPrompt(type, category, level, cnt)
  //   );

  //   let text = "";
  //   for await (const chunk of result.stream) {
  //     const chunkText = chunk.text();
  //     console.log(chunkText);
  //     text += chunkText;
  //   }
}
