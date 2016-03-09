// Libraries ///////////////////////////////////////////////////////////

var Menu = require('./classes/Menu.js'),
    News = require('./classes/News.js'),
    Translator = require('./classes/Translator.js');

// Code ////////////////////////////////////////////////////////////////

var menu = new Menu(false, false, 'Main menu', false);

menu.fillMenus(
  {
    1: new Menu(
      function() {
        var n = new News(menu);
        n.interface();
      },
      'News',
      'News',
      menu
    ),
    2: new Menu(
      function() {
        var t = new Translator(menu);
        t.interface();
      },
      'Translator',
      'Translator',
      menu
    )
  }
);

menu.actionFunc();
