const fs = require('fs');
const path = require('path');

// Função para criar arquivos em diretórios específicos
function createFile(dir, fileName, content) {
	const filePath = path.join(dir, fileName);

	// Cria o diretório se não existir
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	// Cria o arquivo com o conteúdo gerado se não existir
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, content, 'utf8');
		console.log(`Arquivo criado: ${filePath}`);
	}
}

module.exports = createFile;
