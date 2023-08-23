const fs = require('fs');

let tasks = [];
try {
	const data = fs.readFileSync('tasks.json', 'utf8');
	tasks = JSON.parse(data);
} catch (error) {
	console.log('Erro ao carregar as tarefas:', error.message);
}

function saveTasks() {
	fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
}

function addTask(task) {
	tasks.push({ task, completed: false });
	saveTasks();
}

function completeTask(index) {
	if(index >= 0 && index < tasks.length) {
		tasks[index].completed = true;
		saveTasks();
	}
}

function getTasks() {
	return tasks;
}

module.exports = {
	saveTasks,
	addTask,
	completeTask,
	getTasks
};