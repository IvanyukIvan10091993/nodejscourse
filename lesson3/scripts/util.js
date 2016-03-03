var util = {};

util.clearLog = function() {
  process.stdout.write('\033c');
}

module.exports = util;
