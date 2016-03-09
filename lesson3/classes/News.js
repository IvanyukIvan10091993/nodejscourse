// Libraries

var cheerio = require('cheerio'),
    request = require('request'),
    rl = require('./readline.js');

// News constructor

function News(previousObj) {
  this.previousObj = previousObj;
}

// News prototype properties

News.prototype.news = {length: 0};

// News prototype functions

News.prototype.addNew = function(newStr) {
  this.news[this.news.length] = newStr;
  this.news.length += 1;
}

News.prototype.getNews = function(countInt) {
  var self = this; // Scope reference
  console.log('Waiting for response from server...');
  request(
    'http://edition.cnn.com/tech', // Request address
    function (error, response, html) {
      if (!error && response.statusCode === 200) { // Page loaded
        var $ = cheerio.load(html);
        $('.cd__headline-text').each(
          function(i, element) {
            console.log(i);
            self.addNew($(this).text().trim()); // Adds new
          }
        );
        process.stdout.write('\033c'); // Clears log
        self.showNews(countInt);
        rl.i.question(
          'Press any button to return: ',
          function() {
            self.previousObj.actionFunc();
          }
        );
      } else {
        console.log('Error is: ', error);
        console.log('Status code is: ', statusCode);
      }
    }
  );
}

News.prototype.interface = function() {
  var self = this;
  process.stdout.write('\033c'); // Clears console
  rl.i.question(
    'News amount: ',
    function(input) {
      var inputInt = parseInt(input);
      if (isNaN(inputInt)) {
        console.log('Not a number!');
      } else {
        self.getNews(inputInt);
      }
    }
  );
}

News.prototype.showNews = function(countInt) {
  var self = this; // Scope reference
  console.log('Latest news:');
  for (
    var i = 0,
        l = (countInt < this.news.length) ? countInt : this.news.length;
    i < l;
    i++
  ) {
    console.log(' ' + (i + 1) + '. ' + self.news[i]);
  }
}

// Exports /////////////////////////////////////////////////////////////

module.exports = News;
