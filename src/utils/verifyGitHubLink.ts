import axios from "axios";

const verifyGitHubLink = async (githubLink: string) => {
  const rawContentLink = githubLink
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");

  try {
    const response = await axios.get(rawContentLink).then(res => res.data);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export default verifyGitHubLink;
