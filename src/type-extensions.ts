import "hardhat/types/config";

import { HardhatGPTConfig } from "./types";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    gpt: HardhatGPTConfig;
  }
}
