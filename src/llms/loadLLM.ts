import { HardhatGPTConfig } from "../types";
import { getOpenAIChatLLM } from "./builtIn";

export const loadLLM = (config: HardhatGPTConfig) => {
  const llm =
    typeof config.model === "function"
      ? config.model
      : {
          "gpt-3.5-turbo": getOpenAIChatLLM("gpt-3.5-turbo"),
          "gpt-4": getOpenAIChatLLM("gpt-4"),
          "gpt-4-32k": getOpenAIChatLLM("gpt-4-32k"),
        }[config.model];

  return llm;
};
