const request = require('./request.js');
// const response = require('./response.js');
const read = require('./response.js').read;

function  makerequest(url,data){
    request.send(url,data);
    // return response.read(); // need to print the data
    return read();
}

const responseData = makerequest("https://www.google.com","data");
console.log(responseData);
