import fs from "fs";
import upload from "@lucasliet/imgur-ts";
import ora from "ora";

const uploadToImgur = async (filePath: string) => {
  const spinner = ora("Uploading to Imgur").start();
  try {
    const link = await upload(filePath);
    spinner.succeed(`Uploaded to Imgur: ${link}`);
  } catch (error) {
    spinner.fail(`Failed to upload to Imgur: ${error}`);
  }
};

export default uploadToImgur;
