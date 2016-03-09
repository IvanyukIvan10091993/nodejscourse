var rl = {};

rl.readline = require('readline');
rl.i = rl.readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout,
  }
);

// Exports /////////////////////////////////////////////////////////////

module.exports = rl;
