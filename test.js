var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

while (true) {
rl.question('What?', function(answer) {
  console.log('I don\'t care about your shit: ' + answer + '\nFUCK YOU!!!');
  rl.close();
});
};
