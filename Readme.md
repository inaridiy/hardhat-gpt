# Hardhat-GPT

[![npm version](https://badge.fury.io/js/hardhat-gpt.svg)](https://badge.fury.io/js/hardhat-gpt)

Enables ChatGPT to perform tasks such as contract review and testing.

## Quick Start

Install Package

```bash
npm install hardhat-gpt
```

Add the following settings to hardhat.config.js

```js
...
import "hardhat-gpt";
...

const config = {
  solidity: "0.8.17",
  ...
  gpt: {
    apiKey: YOUR_OPEN_AI_API_KEY or environment variable,
  },
};
```

Perform a review by ChatGPT

```bash
npx hardhat ai-review
```

. /reviews folder where your reviews should be stored.

## Tasks

### ai-review

Shortcut for ai-execute review.
When the execution is finished, the reviews are stored in the reviews folder

### ai-test

Shortcut for ai-execute test.
When the execution is finished, the test is stored in the test/ai folder.
gpt-3.5 does not produce decent output!

### ai-execute <taskName>

Execute the set Task

### Configuration

`model` : Currently only gpt-3.5-turbo is supported.
As soon as I get the GPT4 API, that will be supported as well.
You can also define custom functions

`apiKey`: APIKey passed to the model.
Normally, you should specify the APIKey of OpenAI

`targets`: The path to be executed.
It corresponds to the Glob pattern and its array type.
Default is `. /contracts/**/*.sol` is specified.

`continueOnError`: A flag indicating whether or not to continue processing if an error occurs during the execution of LLM inference.
Default is false.

`tasks`: List of Tasks to be given to AI. See below for details.

## Custom AI Tasks

This plugin can be optionally extended by extending the `tasks` property in the configuration.
You can add any task in the following format
Please refer to the built-in tasks for specific parameters

```ts
{
  tasks: {
    yourTaskName: {
      prompt: "prompt for your task",
      output:"output path for your task"
    }
  }
}
```

### Review Task

**Prompt**

```
Please read and review the following Smart Contracts and make them stronger with Markdwon.
Please think logically.

\`\`\`solidity:{{TargetName}}
{{TargetSource}}
\`\`\`
```

**output**

```
"./reviews/{{TargetName}}.md"
```
