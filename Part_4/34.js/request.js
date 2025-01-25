const REQUEST_TIMEOUT = 5000;

function encrypt(data) {
  return "encrypted data";
}

function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`Sending ${encryptedData} to ${url}`);
}

module.exports = {
  REQUEST_TIMEOUT,
  send,
};


