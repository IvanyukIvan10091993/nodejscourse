// Libraries ///////////////////////////////////////////////////////////

var Menu = require('./classes/Menu.js');

// Code ////////////////////////////////////////////////////////////////

var menu = new Menu(false, false, 'Menu0', false);

menu.fillMenus(
  {
    1: new Menu(false, 'Menu1.1', 'Menu1.1', menu),
    2: new Menu(false, 'Menu1.2', 'Menu1.2', menu)
  }
);

menu.menusHash[1].fillMenus(
  {
    1: new Menu(false, 'Menu1.1.1', 'Menu1.1.1', menu.menusHash[1]),
    2: new Menu(false, 'Menu1.1.2', 'Menu1.1.2', menu.menusHash[1])
  }
);

menu.actionFunc();
