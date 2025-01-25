const http = require("http"); // can be used https for secure connection

const req1 = http.request("http://www.google.com", (res) => {
  res.on("data", (chunk) => {
    console.log("Data is received\n", chunk);
  });

  res.on("end", () => {
    console.log("\nData is received completely");
  });
});

req1.end(); //for request to be sent otherwise it will be in pending state

//                   OR

const {get} = require("http"); // no need to call end method

get("http://www.google.com", (res) => {
  res.on("data", (chunk) => {
    console.log("Data is received\n", chunk);
  });

  res.on("end", () => {
    console.log("\nData is received completely");
  });
});
