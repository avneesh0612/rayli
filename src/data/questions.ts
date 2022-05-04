import fs from "fs";
import isImage from "is-image";

import { colors, languages } from "./options";

const questions = [
  {
    type: "search-list",
    name: "color",
    message: "What color style do you want to use?",
    choices: colors,
  },
  {
    type: "list",
    name: "background",
    message: "Do you want to have background?",
    choices: ["true", "false"],
  },
  {
    type: "list",
    name: "darkMode",
    message: "Do you want to use dark mode?",
    choices: ["true", "false"],
  },
  {
    type: "list",
    name: "padding",
    message: "Choose the amount of padding you want to use:",
    choices: ["16", "32", "64", "128"],
  },
  {
    type: "input",
    name: "code",
    message: "Enter the path of the file where the code of snippet is present:",
    validate: (path: string) => {
      if (path.length > 0) {
        if (fs.existsSync(path)) {
          return true;
        }
        return "The file doesn't exist";
      } else {
        return "Please enter a valid file path";
      }
    },
  },
  {
    type: "search-list",
    name: "language",
    message: "Choose the programming language of your code snippet:",
    choices: languages,
  },
  {
    type: "input",
    name: "title",
    message: "Enter the title of your snippet:",
    validate: async (value: string) => {
      if (value.length > 0) {
        return true;
      } else {
        return "Please enter a title for your snippet";
      }
    },
  },
  {
    type: "input",
    name: "download",
    message: "Enter the path where do you want to save the image:",
    validate: async (path: string) => {
      if (path.length > 0) {
        if (fs.existsSync(path)) {
          return true;
        }
        return "The provided path does not exist";
      } else {
        return "Please enter a valid path";
      }
    },
  },
];

const configQuestions = questions.slice(0, 4);

const requiresUserInputQuestions = questions.slice(-4);

const newArr = [...questions];

newArr.splice(4, 1);

const gistQuestions = newArr;

const gistRequiresUserInputQuestions = gistQuestions.slice(-3);

const imgurQuestions = [
  {
    type: "input",
    name: "path",
    message: "Enter the path where the image exists:",
    validate: async (path: string) => {
      if (isImage(path)) {
        return true;
      } else {
        return "Please enter a valid image file's path";
      }
    },
  },
];

export {
  questions,
  configQuestions,
  requiresUserInputQuestions,
  gistQuestions,
  gistRequiresUserInputQuestions,
  imgurQuestions,
};
