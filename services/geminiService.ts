
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getTravelAssistantResponse = async (userPrompt: string) => {
  if (!API_KEY) return { text: "API Key 尚未配置，請檢查環境變數。", sources: [] };

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: `你是一位釜山旅遊達人。請針對以下問題提供建議（請用繁體中文回答，並考慮六月份的天氣與節慶）：${userPrompt}` }]
        }
      ],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "抱歉，我暫時無法回答這個問題。";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "發生錯誤，請稍後再試。", sources: [] };
  }
};
