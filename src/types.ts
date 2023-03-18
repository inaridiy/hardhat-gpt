export type LLM = (prompt: string, config: HardhatGPTConfig) => Promise<string>;

export type BuiltInModels = "gpt-3.5-turbo" | "gpt-4" | "gpt-4-32k";

export interface HardhatGPTConfig {
  model: BuiltInModels | LLM;
  apiKey: string;
  targets: string[] | string;
  continueOnError: boolean;
  tasks: {
    [name in string]: {
      prompt: string;
      output: string;
    };
  };
}
