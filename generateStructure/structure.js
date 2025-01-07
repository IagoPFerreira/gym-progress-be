const createFile = require('./createFile');

const {
	serviceTemplate,
	repositoryTemplate,
	controllerTemplate,
	entityTemplate,
	modelTemplate,
	initializerTemplate,
	routeTemplate,
	indexTemplate,
	indexInitializerTemplate,
} = require('./templates');

// Função para capitalizar a primeira letra
function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

// Função principal para gerar arquivos com base no nome fornecido
function generateStructure({ baseName, layers, context, directory }) {
	const baseDir = directory ?? './src';
	const contextDir = context ? `/${context}` : '';

	// Diretórios onde os arquivos serão criados
	const directories = {
		service: `./${baseDir}/services${contextDir}`,
		repository: `./${baseDir}/repositories${contextDir}`,
		controller: `./${baseDir}/controllers${contextDir}`,
		entity: `./${baseDir}/entities${contextDir}`,
		initializer: `./${baseDir}/initializers${contextDir}`,
		model: `./${baseDir}/models${contextDir}`,
		router: `./${baseDir}/routes${contextDir}`,
	};

	const capitalized = capitalize(baseName);

	// Conteúdo padrão para os arquivos
	const templates = {
		service: serviceTemplate(capitalized),
		repository: repositoryTemplate(capitalized),
		controller: controllerTemplate(capitalized),
		entity: entityTemplate(capitalized),
		model: modelTemplate(capitalized),
		initializer: initializerTemplate(capitalized),
		router: routeTemplate(baseName, capitalized),
	};

	// Cria os arquivos nos diretórios correspondentes
	layers.forEach((layer) => {
		if (templates[layer]) {
			const fileName = `${capitalized}.${layer}.ts`;
			createFile(directories[layer], fileName, templates[layer]);
			createFile(
				directories[layer],
				'index.ts',
				layer === 'initializer'
					? indexInitializerTemplate(capitalized)
					: indexTemplate(capitalized, layer, capitalize(layer))
			);
		}
	});
}

module.exports = generateStructure;
