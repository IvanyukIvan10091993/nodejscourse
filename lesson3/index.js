// Libraries ///////////////////////////////////////////////////////////

var cheerio = require('cheerio'),
    Menu = require('./classes/Menu.js'),
    request = require('request');

// Code ////////////////////////////////////////////////////////////////

var a0 = new Menu(false, false, 'Menu0', false);

var a1 = {
  1: new Menu(false, 'Menu1.1', 'Menu1.1', a0),
  2: new Menu(false, 'Menu1.2', 'Menu1.2', a0)
}
var a1_1 = {
  1: new Menu(false, 'Menu1.1.1', 'Menu1.1.1', a1[1]),
  2: new Menu(false, 'Menu1.1.2', 'Menu1.1.2', a1[1])
}
var a1_2 = {
  1: new Menu(false, 'Menu1.2.1', 'Menu1.2.1', a1[2]),
  2: new Menu(false, 'Menu1.2.2', 'Menu1.2.2', a1[2])
}

/*
console.log('\nOut of constructor calls: ');

console.log('previousMenuObj of ' + a0.headerStr + ': ' + a0.previousMenuObj.headerStr);
console.log('previousMenuObj of ' + a1[1].headerStr + ': ' + a1[1].previousMenuObj.headerStr);
console.log('previousMenuObj of ' + a1[2].headerStr + ': ' + a1[2].previousMenuObj.headerStr);
console.log('previousMenuObj of ' + a1_1[1].headerStr + ': ' + a1_1[1].previousMenuObj.headerStr);
console.log('previousMenuObj of ' + a1_1[2].headerStr + ': ' + a1_1[2].previousMenuObj.headerStr);
console.log('previousMenuObj of ' + a1_2[1].headerStr + ': ' + a1_2[1].previousMenuObj.headerStr);
console.log('previousMenuObj of ' + a1_2[2].headerStr + ': ' + a1_2[2].previousMenuObj.headerStr);
*/

///*
a0.fillMenus(a1);
a1[1].fillMenus(a1_1);
a1[2].fillMenus(a1_2);
//*/

a0.actionFunc();

