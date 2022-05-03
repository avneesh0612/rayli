import fs from "fs";
import path from "path";
import shelljs from "shelljs";

import configFileExists from "../utils/configFileExists";

import { CONFIG_FILE_PATH as configFilePath } from "../data/constants";

const configValues = (
  color: string,
  background: boolean,
  darkMode: boolean,
  padding: string
) => {
  const config = JSON.stringify(
    {
      color: color,
      background: background,
      darkMode: darkMode,
      padding: padding,
    },
    null
  );

  if (configFileExists()) {
    fs.unlinkSync(configFilePath);
  }

  shelljs.mkdir("-p", path.dirname(configFilePath));
  fs.appendFileSync(configFilePath, config);
};

export default configValues;
