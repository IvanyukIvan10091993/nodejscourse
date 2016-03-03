// Libraries

l = require('./libs/libs.js'),
s = require('./scripts/scripts.js');

// Code

function interface() {
  s.util.clearLog();
  l.rl.question(
    'Navigation menu\n [t]Translator\n [n]News\n [q]Quit\n\nChoose option: ',
    function(input) {
      switch(input) {
        case 't': // Translator
          console.log('Not yet implemented');
          //var translator = new s.Translator();
          //translator.interface();
          break;
        case 'n': // News
          var news = new s.News();
          //news.interface();
          s.util.clearLog();
          news.getNews(10);
          l.rl.close();
          break;
        case 'q': // Quit
          l.rl.close();
          break;
        default:
          interface();
          break;
      }
    }
  );
}

interface();
