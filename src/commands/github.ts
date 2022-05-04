import { Command, Flags } from "@oclif/core";
import inquirer from "inquirer";
import chalk from "chalk";

import createImage from "../lib/createImage";

import getGitHubFileContent from "../utils/getGitHubFileContent";
import configFileExists from "../utils/configFileExists";
import getConfigValues from "../utils/getConfigValues";
import verifyGitHubLink from "../utils/verifyGitHubLink";

import {
  gistQuestions,
  gistRequiresUserInputQuestions,
} from "../data/questions";

export default class Github extends Command {
  static description =
    "🐱 Generate a beautiful image of your code hosted on GitHub";

  static examples = [
    "$ rayli github --url=https://raw.githubusercontent.com/Kira272921/snipli/main/src/commands/download.ts",
  ];

  static flags = {
    url: Flags.string({
      char: "u",
      description: "🔗 Link of the code",
      required: true,
    }),
    config: Flags.boolean({
      char: "c",
      description: "🔐 Use the default configured values",
      allowNo: true,
    }),
  };

  async run() {
    const { flags } = await this.parse(Github);

    let promptQuestions = gistQuestions;

    if ((await verifyGitHubLink(flags.url as string)) === false) {
      console.error(
        chalk.red(
          "🚫 The link you provided is not a valid GitHub link. Please try again."
        )
      );
      return;
    }

    if (flags.config === true) {
      if (configFileExists()) {
        promptQuestions = gistRequiresUserInputQuestions;
      } else {
        console.log(
          chalk.redBright(
            "Default configured values not found. Use `rayli config` to configure them."
          )
        );
        return;
      }
    }

    inquirer.prompt(promptQuestions).then(async answers => {
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

      await getGitHubFileContent(flags.url).then(content =>
        createImage(
          color,
          background,
          darkMode,
          padding,
          content,
          answers.language,
          answers.title,
          answers.download
        )
      );
    });
  }
}
