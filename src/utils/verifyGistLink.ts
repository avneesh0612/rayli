import axios from "axios";

const verifyGistLink = async (gistLink: string) => {
  let gistId = gistLink.split("/").pop();
  try {
    const response = await axios.get(`https://api.github.com/gists/${gistId}`);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export default verifyGistLink;
