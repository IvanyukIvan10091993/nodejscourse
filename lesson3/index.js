// Libraries ///////////////////////////////////////////////////////////

var Menu = require('./classes/Menu.js'),
    News = require('./classes/News.js');

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
    2: new Menu(false, 'Translator', 'Translator', menu)
  }
);

menu.actionFunc();
