const axios = require("axios");

axios
  .get("https://www.amazon.com")
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log("ALL DONE");
  });
