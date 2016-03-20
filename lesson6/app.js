// Dependencies

var SiteController = require('../controllers/SiteController.js').SiteController,
    UserController = require('../controllers/UserController.js').UserController,
    app = require('../config/app.js').app;

// Variables

var PORT = 3000;

// Migration



// Server

var server = app.listen(PORT, function() {
  var host = this.address().address;
  var port = this.address().port;
  console.log('Server runs on: ', host, port);
});
