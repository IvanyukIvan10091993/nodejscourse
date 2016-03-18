// Modules

var tasks = require('./models/tasks.js').tasks;

tasks.add({task_name: 'Do staff', task_description: 'Do some fancy staff', task_priority: 1});
tasks.edit(4, {task_name: 'Do staff', task_description: 'Do some fancier staff', task_priority: 1});
tasks.delete(5);
tasks.list();
