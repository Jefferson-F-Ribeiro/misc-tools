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
		<a href="/about">Ir para a Página Sobre</a><br>
		Bem vindo ao meu aplicativo!
	</body>
	</html>
		`;
}

function generateAboutPage(){
	const header = generateHeader("Página Sobre");
	return `
		${header}
		<body>
		<a href="/">Voltar para a Página Inicial</a><br>
		Página Sobre
		</body>
		</html>
		`;	
}

module.exports = {
	generateHeader,
	generateHomePage,
	generateAboutPage
};