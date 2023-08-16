const http = require('http');

const server = http.createServer((req, res) => {
	if(req.url == '/'){
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.end('Bem vindo ao meu aplicativo!\n');
	}

	else if(req.url == '/about'){
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.end('Página sobre\n');	
	}
	
	else {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.end('404 página não encontrada\n');
	}
});

const port = 3000;
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
}); 
