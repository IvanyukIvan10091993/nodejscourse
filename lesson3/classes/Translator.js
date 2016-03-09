// Libraries ///////////////////////////////////////////////////////////

var request = require('request'),
    rl = require('./readline.js');

// Translator constructor //////////////////////////////////////////////

function Translator(previousObj) {
  this.previousObj = previousObj;
}

// Prototype properties

Translator.prototype.key = 'trnsl.1.1.20160309T191525Z.8270ad2235489973.2ac7678cc36eb5fa1d35e05548d728a63329dea9';

// Prototype methods

Translator.prototype.interface = function() {
  process.stdout.write('\033c'); // Clears log
  var self = this;
  rl.i.question(
    'Переводчик\n Введите слово: ',
    function(input) {
      if (input) {
        self.translate(input);
      } else {
        self.interface();
      }
    }
  );
}

Translator.prototype.translate = function(inputStr) {
  var self = this;
  request(
    {
      method: "GET",
      uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' +
            self.key +
            '&text=' +
            inputStr +
            '&lang=en-ru'
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var txt = JSON.parse(body);
        txt.text.forEach(function (t) {
          console.log(t);
        });
        rl.i.question(
          'Press any button to return: ',
          function() {
            self.previousObj.actionFunc();
          }
        );
      } else {
        console.log('Error is: ', error);
      }
    }
  );
}

// Exports /////////////////////////////////////////////////////////////

module.exports = Translator;
