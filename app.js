const http = require('http');
const functions = require('./functions');
const taskmaster = require('./taskmaster');

const server = http.createServer((req, res) => {
	if(req.url == '/'){
		res.statusCode = 200;
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(functions.generateHomePage());
	}

	else if(req.url == '/about'){
		res.statusCode = 200;
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(functions.generateAboutPage());	
	}

	else if(req.url == '/taskmaster'){
		res.statusCode = 200;
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(functions.generateTaskmasterPage());
	}

	else if(req.method == 'POST' && req.url == '/taskmaster/addtask'){
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const formData = new URLSearchParams(body);
			const newTask = formData.get('task');
			taskmaster.addTask(newTask);

			res.writeHead(302, { Location: '/taskmaster'});
			res.end();
		});
	}
	
	else {
		res.statusCode = 404;
		res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
		res.end('404 página não encontrada\n');
	}
});

const port = 3000;
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
}); 
