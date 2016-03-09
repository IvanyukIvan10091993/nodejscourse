// Libraries ///////////////////////////////////////////////////////////

var rl = require('./readline.js');

// Menu constructor ////////////////////////////////////////////////////

function Menu(actionFunc, descriptionStr, headerStr, previousMenuObj) {
  var self = this;
  if (actionFunc) this.actionFunc = actionFunc;
  if (descriptionStr) this.descriptionStr = descriptionStr;
  if (headerStr) this.headerStr = headerStr;
  this.previousMenuObj = (previousMenuObj) ? previousMenuObj : this;
  this.bottomMenusHash = {
    b: { // Back option
      actionFunc: function() {self.previousMenuObj.actionFunc();},
      descriptionStr: 'Back to ' + self.previousMenuObj.headerStr
    },
    q: { // Quit option
      actionFunc: self.quitFunc,
      descriptionStr: 'Quit'
    }
  };
}

// Menu prototype properties

Menu.prototype.descriptionStr = 'Description';

Menu.prototype.headerStr = 'Header';

Menu.prototype.menusHash = {};

// Menu prototype methods

Menu.prototype.actionFunc = function() {
  var self = this; // Scope reference
  self.clearLog();
  self.showMenus(self.menusHash);
  rl.i.question(
    '\nChoose option: ',
    function(input) {
      if (input in self.bottomMenusHash) { // Input option exists in bottomMenusHash
        self.bottomMenusHash[input].actionFunc();
      } else if (input in self.menusHash) { // Input option exists in menusHash
        self.menusHash[input].actionFunc();
      } else { // Input option doesn't exist
        self.actionFunc();
      }
    }
  );
}

Menu.prototype.clearLog = function() {
  process.stdout.write('\033c');
}

Menu.prototype.fillMenus = function(menusHash) {
  this.menusHash = menusHash;
}

Menu.prototype.showMenus = function() {
  var bottomMenusHash = this.bottomMenusHash,
      menusHash = this.menusHash;
  console.log(this.headerStr);
  for (var key in menusHash) {
    console.log(' [' + key + ']' + menusHash[key].descriptionStr);
  }
  console.log();
  for (var key in bottomMenusHash) {
    console.log(' [' + key + ']' + bottomMenusHash[key].descriptionStr);
  }
}

Menu.prototype.quitFunc = function() {
  rl.i.close();
}

// Exports /////////////////////////////////////////////////////////////

module.exports = Menu;
