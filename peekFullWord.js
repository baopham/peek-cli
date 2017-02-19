const tesseract = require('node-tesseract');
const chalk = require('chalk');
const log = console.log;

module.exports = peekFullWord;

function peekFullWord(filePath, lookup) {
  tesseract.process(filePath, process);

  function process(err, text) {
    if (err) {
      chalk.red('Sorry, could not process your image');
      return;
    }

    const lines = text.split('\n').filter(line => line.length);

    const matches = lines.filter(line => line.split(' ').filter(item => item.trim() === lookup).length);

    if (!matches.length) {
      log(chalk.yellow(`Could not find any matches for ${lookup}`));
      return;
    }

    matches.forEach(match => {
      const items = match.split(' ')
        .map(item => {
          if (item.trim() === lookup) {
            return chalk.green(lookup);
          }
          return item;
        });

      log(items.join(' '));
    });
  }
}

