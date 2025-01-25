const request= require("./request");// don't need to specify the extension

request.send=()=>console.log("Custom send function");

request.send();