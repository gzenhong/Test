
import { GoogleGenAI } from "@google/genai";

// 優先從 process.env 讀取，這在 Vite 經由 define 配置後會生效
const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

export const getTravelAssistantResponse = async (userPrompt: string) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return { text: "API Key 尚未配置，請在 Vercel Environment Variables 中設定 API_KEY。", sources: [] };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
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
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API key not valid")) {
      return { text: "API Key 無效，請檢查專案權限與金鑰設定。", sources: [] };
    }
    return { text: "發生錯誤，請稍後再試。", sources: [] };
  }
};
