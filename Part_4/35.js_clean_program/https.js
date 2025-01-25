// Structuring Syntax
const { send } = require("./request.js");
const { read } = require("./response.js"); //read const set to return read property

function makerequest(url, data) {
  send(url, data);
  return read();
}

const responseData = makerequest("https://www.google.com", "data");
console.log(responseData);

// Node maints a cache of all the modules that have been loaded. If you require a module that has already been loaded, Node will return the cached module instead of loading it again. This is why you can require the same module in multiple files without worrying about it being loaded multiple times.
console.log(require.cache);
