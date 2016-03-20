// Modules

var db = require(__dirname + '/../config/db.js').db,
    mysql = require('mysql');
    
// Variables

var connectionPool = mysql.createPool(db);

// Model tasks

var tasks = {
  
  list: function(callback) {
    connectionPool.getConnection(function (err, connection) { // gets connection
      if (err) console.error(err); // checks and logs errors
      connection.query('SELECT * FROM tasks;', function (err, rows) {
        console.log(rows); // logs * from table
      });
      connection.release(); // releases connection
    });
  },
  
  add: function(task, callback) {
    connectionPool.getConnection(function (err, connection) { // gets connection
      if (err) console.error(err); // checks and logs errors
      connection.query('INSERT INTO tasks SET ?;', task, function (err, rows) {
        //console.log(rows);
      });
      connection.release(); // releases connection
    });
  },
  
  edit: function(id, task, callback) {
    connectionPool.getConnection(function (err, connection) { // gets connection
      if (err) console.error(err); // checks and logs errors
      var query = connection.query('UPDATE tasks SET ? WHERE task_id = ?;', [task, id], function (err, rows) {
        //console.log(rows);
      });
      connection.release(); // releases connection
    });
  },
  
  'delete': function(id, callback) {
    connectionPool.getConnection(function (err, connection) { // gets connection
      if (err) console.error(err); // checks and logs errors
      var query = connection.query('DELETE FROM tasks WHERE task_id = ?;', id, function (err, rows) {
        //console.log(rows);
      });
      connection.release(); // releases connection
    });
  }
}

// Exports

module.exports.tasks = tasks;
