import { Command, Flags } from "@oclif/core";
import inquirer from "inquirer";
import chalk from "chalk";

import createImage from "../lib/createImage";

import getGistContent from "../utils/getGistContent";
import configFileExists from "../utils/configFileExists";
import getConfigValues from "../utils/getConfigValues";
import verifyGistLink from "../utils/verifyGistLink";

import {
  gistQuestions as questions,
  gistRequiresUserInputQuestions,
} from "../data/questions";

export default class Gist extends Command {
  static description = "🌌 Generate a beautiful image of your gist";

  static examples = [
    "$ rayli gist --url=https://gist.github.com/Kira272921/bfce776b3ad1145f764d89c296fec605",
  ];

  static flags = {
    url: Flags.string({
      char: "u",
      description: "🔗 Link of the gist",
      required: true,
    }),
    config: Flags.boolean({
      char: "c",
      description: "🔐 Use the default configured values",
      allowNo: true,
    }),
  };

  async run() {
    const { flags } = await this.parse(Gist);

    let gistId = flags.url.split("/").pop();
    let promptQuestions = questions;

    if ((await verifyGistLink(flags.url as string)) === false) {
      console.error(
        chalk.red(
          "🚫 The link you provided is not a valid Gist link. Please try again."
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
      }
    }

    inquirer.registerPrompt("search-list", require("inquirer-search-list"));

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

      await getGistContent(gistId as string).then(content =>
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
