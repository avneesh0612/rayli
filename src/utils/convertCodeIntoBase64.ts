import { Base64 } from "js-base64";

const convertCodeIntoBase64 = (code: string) => {
  return Base64.encodeURI(code);
};

export default convertCodeIntoBase64;
