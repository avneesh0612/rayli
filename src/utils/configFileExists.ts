import fs from "fs";

import { CONFIG_FILE_PATH as configFilePath } from "../data/constants";

const configFileExists = () => {
  try {
    fs.accessSync(configFilePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export default configFileExists;
