// Modules

var tasks = require('./models/tasks.js').tasks;

tasks.add({task_id: 1, task_name: 'Do stuff', task_description: 'Do some fancy stuff', task_priority: 1});
tasks.add({task_id: 2, task_name: 'Do stuff', task_description: 'Do some fancier stuff', task_priority: 1});

tasks.list();

tasks.edit(1, {task_name: 'Do stuff', task_description: 'Do some fanciest stuff', task_priority: 1});
tasks.edit(2, {task_isComplete: 1});

tasks.list();

for (var i = 0, len = 100; i < len; i++) {
  tasks.delete(i);
}
