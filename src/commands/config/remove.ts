import { Command } from "@oclif/core";
import chalk from "chalk";
import console from "console";
import fs from "fs";

import { CONFIG_FILE_PATH as configFilePath } from "../../data/constants";

import configFileExists from "../../utils/configFileExists";

export default class Show extends Command {
  static description = "🚚 Remove the configured values";

  static examples = ["$ rayli config remove"];

  async run() {
    if (configFileExists()) {
      try {
        fs.unlinkSync(configFilePath);
        console.log(
          chalk.greenBright("🚚 Successfully removed the configured values.")
        );
      } catch (err) {
        console.log(
          chalk.redBright(
            "Something went wrong while removing the configured values."
          )
        );
        console.log(err);
      }
    } else {
      console.log(
        chalk.redBright(
          "🔐 Default configured values not found. Use `rayli config` to configure them."
        )
      );
    }
  }
}
