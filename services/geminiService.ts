
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from "../constants";
import { ExplanationOutput, ProgrammingLanguage } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined in the environment.");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async explainCode(code: string, language: ProgrammingLanguage): Promise<ExplanationOutput> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Please explain the following ${language === 'auto' ? 'automatically detected' : language} code snippet:
        
        \`\`\`
        ${code}
        \`\`\`
        
        Remember to focus on the non-technical audience and follow the requested structure.`,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
          temperature: 0.7,
        },
      });

      if (!response.text) {
        throw new Error("No response received from the model.");
      }

      return JSON.parse(response.text.trim()) as ExplanationOutput;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
