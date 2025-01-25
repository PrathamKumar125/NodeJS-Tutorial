import { send } from "./request.mjs";
import { read } from "./response.mjs";

function makerequest(url, data) {
  send(url, data);
  return read();
}

const responseData = makerequest("https://www.google.com", "data");
console.log(responseData);
