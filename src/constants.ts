import { HardhatGPTConfig } from "./types";

export const DEFAULT_REVIEW_PROMPT = `
The following smart contract has a bug.
Look for bugs and flaws while simulating smart contract behavior.
     
{{TargetName}}

{{TargetSource}}`;

export const DEFAULT_TEST_PROMPT = `
Please read the following Contract and write a Javascript test code with the file name test.js that works with Hardhat.
Please think logically.

{{TargetName}}

{{TargetSource}}`;

export const DEFAULT_GPT_OPTIONS = {
  apiKey: process.env.OPENAI_API_KEY || "",
  model: "gpt-3.5-turbo",
  targets: ["./contracts/**/*.sol"],
  continueOnError: false,
  tasks: {
    review: {
      prompt: DEFAULT_REVIEW_PROMPT,
      output: "./reviews/{{TargetName}}.md",
    },
    test: {
      prompt: DEFAULT_TEST_PROMPT,
      output: "./tests/ai/{{TargetName}}.js",
    },
  },
} satisfies HardhatGPTConfig;
