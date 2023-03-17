import { promises as fs } from "fs";
import glob from "glob";
import { task } from "hardhat/config";
import * as path from "path";
import * as R from "ramda";
import { DEFAULT_GPT_OPTIONS } from "./constants";
import { loadLLM } from "./llms";
import { TASK_AI_REVIEW, TASK_AI_TEST, TASK_CUSTOM } from "./task-names";
import "./type-extensions";
import { HardhatGPTConfig } from "./types";

task(TASK_AI_TEST).setAction(async (_, hre) => {
  await hre.run(TASK_CUSTOM, { taskName: "test" });
});

task(TASK_AI_REVIEW).setAction(async (_, hre) => {
  await hre.run(TASK_CUSTOM, { taskName: "review" });
});

task(TASK_CUSTOM)
  .addPositionalParam("taskName", "The name of the task to execute")
  .setAction(async (args, hre) => {
    const options: HardhatGPTConfig = R.mergeDeepRight(
      DEFAULT_GPT_OPTIONS,
      (hre.config as any).gpt
    );
    const llm = loadLLM(options);

    const taskInfo = options.tasks[args.taskName];
    if (!taskInfo) throw new Error(`Task ${args.taskName} not found`);
    await fs.mkdir(path.resolve(path.dirname(taskInfo.output)), { recursive: true });

    const targetFiles = await glob(options.targets).then(R.map(path.resolve));
    const results: Record<string, string> = {};

    for (const targetFile of targetFiles) {
      console.log(`Processing ${targetFile}`);
      const targetSource = await fs.readFile(targetFile, "utf-8");
      const targetName = path.basename(targetFile);

      const prompt = taskInfo.prompt
        .replace(/{{TargetName}}/, targetName)
        .replace(/{{TargetSource}}/, targetSource);

      const result = await llm(prompt, options).catch((e) => {
        if (!options.continueOnError)
          throw new Error(`Failed to generate ${args.taskName} for ${targetName}`);
        return "";
      });

      const outputPath = path.resolve(taskInfo.output).replace(/{{TargetName}}/, targetName);
      await fs.writeFile(outputPath, result);
      results[targetName] = result;
    }

    return results;
  });
