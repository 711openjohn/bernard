import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

export class Chatgpt {
  public API_KEY = "";
  public async chat(prompt: string): Promise<string> {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Your answer will be short",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.API_KEY}`,
        },
      }
    );
    return response.data.choices[0]["message"]["content"];
  }
}
