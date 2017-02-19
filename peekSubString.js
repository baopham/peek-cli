const tesseract = require('node-tesseract');
const chalk = require('chalk');
const log = console.log;

module.exports = peekSubString;

function peekSubString(filePath, lookup) {
  tesseract.process(filePath, process);

  function process(err, text) {
    if (err) {
      chalk.red('Sorry, could not process your image');
      return;
    }

    const lines = text.split('\n').filter(line => line.length);

    const matches = lines.filter(line => line.includes(lookup));

    if (!matches.length) {
      log(chalk.yellow(`Could not find any matches for ${lookup}`));
      return;
    }

    matches.forEach(match => {
      const items = match.split(' ')
        .map(item => {
          return item.replace(new RegExp(`(${lookup})`), chalk.green('$1'));
        });

      log(items.join(' '));
    });
  }
}
