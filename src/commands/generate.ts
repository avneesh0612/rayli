import { Command, Flags } from "@oclif/core";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

import createImage from "../lib/createImage";

import configFileExists from "../utils/configFileExists";
import getConfigValues from "../utils/getConfigValues";

import {
  questions as questions,
  requiresUserInputQuestions,
} from "../data/questions";

export default class Generate extends Command {
  static description = "📷 Generate a beautiful image of your code snippet";

  static examples = ["$ rayli generate"];

  static flags = {
    config: Flags.boolean({
      char: "c",
      description: "🔐 Use the default configured values",
      allowNo: true,
    }),
  };

  async run() {
    const { flags } = await this.parse(Generate);

    let promptQuestions = questions;

    if (flags.config === true) {
      if (configFileExists()) {
        promptQuestions = requiresUserInputQuestions;
      } else {
        console.log(
          chalk.redBright(
            "Default configured values not found. Use `rayli config` to configure them."
          )
        );
        process.exit(1);
      }
    }

    inquirer.prompt(promptQuestions).then(answers => {
      let color = answers.color,
        background = answers.background,
        darkMode = answers.darkMode,
        padding = answers.padding;

      if (flags.config) {
        color = getConfigValues().color;
        background = getConfigValues().background;
        darkMode = getConfigValues().darkMode;
        padding = getConfigValues().padding;
      }

      createImage(
        color,
        background,
        darkMode,
        padding,
        fs.readFileSync(answers.code, "utf-8"),
        answers.language,
        answers.title,
        answers.download
      );
    });
  }
}
