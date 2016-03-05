// Libraries ///////////////////////////////////////////////////////////

var readline = require('readline'),
    rl = readline.createInterface(
      {
        input: process.stdin,
        output: process.stdout
      }
    );

// Menu constructor ////////////////////////////////////////////////////

function Menu(actionFunc, descriptionStr, headerStr, previousMenuObj) {
  var self = this;
  if (actionFunc) this.actionFunc = actionFunc;
  if (descriptionStr) this.descriptionStr = descriptionStr;
  if (headerStr) this.headerStr = headerStr;
  this.previousMenuObj = (previousMenuObj) ? previousMenuObj : this;
  this.bottomMenusHash = {
    b: {
      actionFunc: function() {self.previousMenuObj.actionFunc()},
      descriptionStr: 'Back to ' + self.previousMenuObj.headerStr
    },
    q: {
      actionFunc: function() {rl.close();},
      descriptionStr: 'Quit'
    }
  };
  console.log('previousMenuObj of ' + this.headerStr + ': ' + this.previousMenuObj.headerStr);
}

// Menu prototype properties

Menu.prototype.descriptionStr = 'Description';

Menu.prototype.headerStr = 'Header';

// Menu prototype methods

Menu.prototype.actionFunc = function() {
  var self = this; // Scope reference
  self.clearLog();
  self.showMenus(self.menusHash);
  rl.question(
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

/*Menu.prototype.bottomMenusHash = {
  b: false,
  q: { // Default option quit
    actionFunc: function() {rl.close();},
    descriptionStr: 'Quit'
  }
};
*/

// Exports /////////////////////////////////////////////////////////////

module.exports = Menu;
