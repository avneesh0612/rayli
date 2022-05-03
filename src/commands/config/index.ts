import { Command } from "@oclif/core";
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

import configValues from "../../lib/configValues";

import { configQuestions as questions } from "../../data/questions";

export default class Config extends Command {
  static description = "🔐 Configure the default values";

  static examples = ["$ rayli config"];

  async run() {
    inquirer.prompt(questions).then((answers) => {
      const spinner = ora("🔐 Configuring the default values").start();

      try {
        configValues(
          answers.color,
          answers.background,
          answers.darkMode,
          answers.padding
        );

        spinner.succeed(
          chalk.greenBright("Successfully configured the values")
        );
      } catch (err) {
        spinner.fail(
          chalk.redBright(
            "Something went wrong while configuring the default values"
          )
        );
        console.log(err);
      }
    });
  }
}
