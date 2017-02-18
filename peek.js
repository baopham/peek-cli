const tesseract = require('node-tesseract');

module.exports = peek;

function peek(filePath, lookup) {
  tesseract.process(filePath, (err, text) => {
    err && console.error(err);
    text && console.log(text);
  });
}
