import { Command } from "@oclif/core";
import chalk from "chalk";

import configFileExists from "../../utils/configFileExists";
import getConfigValues from "../../utils/getConfigValues";

export default class Show extends Command {
  static description = "👀 Check your configured values";

  static examples = ["$ rayli config show"];

  async run() {
    if (configFileExists()) {
      const configValues = getConfigValues();

      console.log(
        chalk.greenBright(
          `🔐 Your default configured values are:\n\n- 🎨 Color: ${configValues.color}\n- 🖼 Background: ${configValues.background}\n- 🌑 Dark Mode: ${configValues.darkMode}\n- 🖌 Padding: ${configValues.padding}`
        )
      );
    } else {
      console.log(
        chalk.redBright(
          "🔐 Default configured values not found. Use `rayli config` to configure them."
        )
      );
    }
  }
}
