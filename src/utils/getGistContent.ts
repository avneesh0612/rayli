import axios from "axios";

const getGistContent = async (gistId: string) => {
  const response = await axios
    .get(`https://api.github.com/gists/${gistId}`)
    .then((res) => res.data);

  const file = Object.keys(response.files)[0];
  const content = response.files[file].content;
  return content;
};

export default getGistContent;
