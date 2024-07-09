import { GoogleGenerativeAI } from "@google/generative-ai";

export class Gemini {
  public API_KEY = "";
  public async chat(prompt: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(this.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}
