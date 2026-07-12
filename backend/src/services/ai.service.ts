import client from "../config/openrouter";
import { SYSTEM_PROMPT } from "../utils/prompt";

export async function extractCRMData(records: any[]) {
  for (let i = 0; i < 3; i++) {
    try {
      const response = await client.chat.completions.create({
        model: process.env.AI_MODEL!,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: JSON.stringify(records),
          },
        ],
        temperature: 0,
      });

      const content = response.choices[0].message.content?.trim() || "";

      if (content.startsWith("{")) {
        return content;
      }
    } catch (err) {
      console.log("Retry...", i + 1);
    }
  }

  return JSON.stringify({
    records: [],
  });
}
