const http = require('http');

function generateHomePage(){
	return `
		<a href="/about">Ir para a Página Sobre</a><br>
		Bem vindo ao meu aplicativo!
		`;
}

function generateAboutPage(){
	return `
		<a href="/">Voltar para a Página Inicial</a><br>
		Página Sobre
		`;	
}

const server = http.createServer((req, res) => {
	if(req.url == '/'){
		res.statusCode = 200;
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(generateHomePage());
	}

	else if(req.url == '/about'){
		res.statusCode = 200;
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(generateAboutPage());	
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
