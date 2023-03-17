import { Configuration, OpenAIApi } from "openai";
import { LLM } from "../../types";

export const chatGpt: LLM = async (prompt, config) => {
  const openai = new OpenAIApi(new Configuration({ apiKey: config.apiKey }));
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  const content = res.data.choices[0].message?.content;
  if (!content) throw new Error("No content in response");
  else return content;
};
