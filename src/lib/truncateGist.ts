import chalk from "chalk";

import getGistContent from "../utils/getGistContent";

const truncateGist = async (range: string, gistId: string) => {
  try {
    const [start, end] = range.split("-");

    const content = getGistContent(gistId);
    const contentArray = (await content).split("\n");

    const startIndex = parseInt(start, 10);
    const endIndex = parseInt(end, 10);

    if (typeof startIndex !== "number" && typeof endIndex !== "number") {
      throw new Error("Invalid range");
    }

    if (startIndex > endIndex) {
      throw chalk.red(
        "The start index cannot be greater than the end index. Please try again."
      );
    }

    if (startIndex < 0 || endIndex < 0) {
      throw chalk.red(
        "The start index and end index cannot be less than 0. Please try again."
      );
    }

    if (startIndex > contentArray.length || endIndex > contentArray.length) {
      throw chalk.red(
        "The start index and end index cannot be greater than the length of the Gist. Please try again."
      );
    }

    const truncatedContent = contentArray.slice(startIndex - 1, endIndex);

    return truncatedContent.join("\n");
  } catch (err) {
    throw chalk.red(err);
  }
};

export default truncateGist;
