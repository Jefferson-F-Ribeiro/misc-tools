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
		<a href="/about">Ir para a Página Sobre</a><br>
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
	const taskList = taskmaster.getTasks().map((task, index) => {
		return `${index + 1}. [${task.completed ? 'x' : ' '}] ${task.task}<br>`;
	}).join('');
	r = `
		${header}
		<body>
		O Taskmaster é um gadget que te ajuda a organizar suas tarefas. <br>
		<h2> Lista de Tarefas: </h2>
		${taskList}
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

function parseRequestBody(body) {
	const pairs = body.split('&');
	const data = {};
	pairs.forEach((pair) => {
		const [key, value] = pair.split('=');
		data[key] = decodeURIComponent(value);
	});
	return data.task;	
}

module.exports = {
	generateHeader,
	generateHomePage,
	generateAboutPage,
	generateTaskmasterPage,
	parseRequestBody
};