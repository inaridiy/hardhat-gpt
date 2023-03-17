import { HardhatGPTConfig } from "../types";
import { chatGpt } from "./builtIn";

export const loadLLM = (config: HardhatGPTConfig) => {
  const llm =
    typeof config.model === "function"
      ? config.model
      : {
          "gpt-3.5-turbo": chatGpt,
        }[config.model];

  return llm;
};
