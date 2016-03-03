// News constructor

function News() {
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
  console.log('Waiting response from server...');
  l.request(
    'http://edition.cnn.com/tech', // Request address
    function (error, response, html) {
      if (!error && response.statusCode === 200) { // Page loaded
        var $ = l.cheerio.load(html);
        $('.cd__headline-text').each(
          function(i, element) {
            self.addNew($(this).text().trim()); // Adds new
          }
        );
        s.util.clearLog();
        self.showNews(countInt);
      } else {
        console.log('error is: ', error);
        console.log('statusCode is: ', statusCode);
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
