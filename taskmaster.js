const fs = require('fs');

let tasks = [];
let done = [];
try {
	const data = fs.readFileSync('tasks.json', 'utf8');
	const data2 = fs.readFileSync('done.json', 'utf8');
	tasks = JSON.parse(data);
	done = JSON.parse(data2);

	console.log(tasks);
	console.log(done);
	
} catch (error) {
	console.log('Erro ao carregar as tarefas:', error.message);
}

function saveTasks() {
	fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
	fs.writeFileSync('done.json', JSON.stringify(done, null, 2), 'utf8');
}

function addTask(task) {
	tasks.push({ task, completed: false });
	saveTasks();
}

function addDone(task) {
	done.push({ task, completed: true });
	saveTasks();
}

function completeTask(index) {
	if(index >= 0 && index < tasks.length) {
		tasks[index].completed = true;
		addDone(tasks[index].task);
		deleteTask(index, tasks);
		saveTasks();
	}
}

function relistTask(index) {
	if(index >= 0 && index < done.length) {
		done[index].completed = !done[index].completed;
		addTask(done[index].task);
		deleteTask(index, done);
		saveTasks();
	}
}

function deleteTask(index, source) {
	if(index >= 0 && index < source.length){
		source.splice(index, 1);
		saveTasks();
	}
}

function getTasks() {
	return tasks;
}

function getDones() {
	return done;
}

module.exports = {
	saveTasks,
	addTask,
	completeTask,
	getTasks,
	deleteTask,
	relistTask,
	getDones
};