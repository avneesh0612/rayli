import fs from "fs";

import { CONFIG_FILE_PATH as configFilePath } from "../data/constants";

const getConfigValues = () => {
  try {
    const config = fs.readFileSync(configFilePath, "utf-8");
    return JSON.parse(config);
  } catch (err) {
    return null;
  }
};

export default getConfigValues;
