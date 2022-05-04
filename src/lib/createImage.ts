import puppeteer, { Browser } from "puppeteer";
import path from "path";
import chalk from "chalk";
import ora from "ora";

import convertCodeIntoBase64 from "../utils/convertCodeIntoBase64";

const createImage = async (
  color: string,
  background: boolean,
  darkMode: boolean,
  padding: string,
  code: string,
  language: string,
  title: string,
  downloadPath: string
) => {
  const spinner = ora("📷 Generating image...").start();
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    const base64EncodedCode = convertCodeIntoBase64(code);

    await page.goto(
      `https://ray.so/?colors=${color.toLowerCase()}&background=${background}&darkMode=${darkMode}&padding=${padding}&title=${encodeURI(
        title
      )}&code=${base64EncodedCode}&language=${language.toLowerCase()}`
    );

    const resolvedDownloadPath = path.resolve(
      `${process.cwd()}/${downloadPath}`
    );

    await (page as any)._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: resolvedDownloadPath,
    });

    await page.click(".export");

    await browser.close();

    console.log(
      chalk.green(
        `📸 Image of your code has been saved at ${resolvedDownloadPath}`
      )
    );

    spinner.succeed();
  } catch (err) {
    spinner.fail();
    await browser.close();
    console.log(chalk.red("An error occurred while generating image"));
    console.log(chalk.red(err));
  }
};

export default createImage;
