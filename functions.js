const taskmaster = require('./taskmaster');

function generateHeader(title){
	return `
	<!DOCTYPE html>
	<html>
		<meta charset="utf-8">
	<head>
		<title>${title}</title>
	</head> `;
}

function generateHomePage(){
	const header = generateHeader("Página Inicial");
	return `
		${header}
		<body>
		Bem vindo ao meu aplicativo! <br>
		<a href="/about">Sobre</a><br>
		<a href="/taskmaster">Taskmaster</a><br>
		</body>
		</html>
		`;
}

function generateAboutPage(){
	const header = generateHeader("Página Sobre");
	return `
		${header}
		<body>
		Página Sobre <br>
		<a href="/">Voltar para a Página Inicial</a><br>
		</body>
		</html>
		`;	
}

function generateTaskmasterPage(){
	const header = generateHeader("Taskmaster");
	
	try{
	const tasks = taskmaster.getTasks();
	const decodedTasks = decodeTasks(tasks);
	const taskList = generateTaskList(decodedTasks);
	

	const done = taskmaster.getDones();
	const decodedDone = decodeTasks(done);
	const doneList = generateTaskList(decodedDone);


	r = `
		${header}
		<body>
		O Taskmaster é uma aplicação que te ajuda a organizar suas tarefas. <br>
		<h2> Lista de Tarefas: </h2>
		${taskList}
		<br>
		<h2> Concluídas: </h2>
		${doneList}
		<br>
		<form action="/taskmaster/addtask" method="post"> 
		<label for= "task">Nova Tarefa: </label>
		<input type="text" id="task" name="task">
		<button type="submit" name="submit">Adicionar</button>
		</form>

		<a href="/">Voltar</a><br>
		</body>
		</html>
		`;
	} catch (error) {
		console.log(error.message);
	r = ` 
		${header}
		<body>
		O Taskmaster é um gadget que te ajuda a organizar suas tarefas. <br>		
		Cadastre sua primeira task:

		<form action="/taskmaster/addtask" method="post"> 
		<label for= "task">Nova Tarefa: </label>
		<input type="text" id="task" name="task">
		<button type="submit" name="submit">Adicionar</button>
		</form>

		</body>
		</html>
		`;
	}
	
	return r;	
}


function decodeTasks(tasks) {
	return tasks.map(task => {
		return { task: decodeURIComponent(task.task), completed: task.completed };
	});
}

function generateTaskList(source) {

	return source.map((task, index) => {
		const buttonAction = task.completed
		? 'Relistar' : 'Concluir';

		const buttonLink = task.completed
		? `/taskmaster/relisttask/${index}`
		: `/taskmaster/completetask/${index}`;
		
		const path = !task.completed
		? `/taskmaster/deletetask/done/${index}` : `/taskmaster/deletetask/task/${index}`;

		const deleteLink = path;

		const deleteButton = `<a href="${deleteLink}"><button>Deletar</button></a>`;

		const button = `<a href="${buttonLink}"><button>${buttonAction}</button></a>`;

		return `${index +1}. ${task.task} [${task.completed}] [${index}] ${button} ${deleteButton}<br>`;

	}).join('');
}

module.exports = {
	generateHeader,
	generateHomePage,
	generateAboutPage,
	generateTaskmasterPage
};