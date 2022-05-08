import { Command } from "@oclif/core";
import inquirer from "inquirer";

import uploadToImgur from "../utils/uploadToImgur";

import { imgurQuestions as questions } from "../data/questions";

export default class Imgur extends Command {
  static description = "✈ Upload an image to Imgur";

  static examples = ["$ rayli imgur"];

  async run() {
    inquirer.prompt(questions).then(answers => {
      uploadToImgur(answers.path);
    });
  }
}
