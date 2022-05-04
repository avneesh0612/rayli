import axios from "axios";

const getGitHubFileContent = async (githubFileLink: string) => {
  const rawContentLink = githubFileLink
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");
  const response = await axios.get(rawContentLink).then(res => res.data);
  return response;
};

export default getGitHubFileContent;
