const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const generateStructure = require('./structure');

const argv = yargs(hideBin(process.argv))
	.option('name', {
		alias: 'n',
		type: 'string',
		demandOption: true,
		describe: 'Nome base para os arquivos e classes',
	})
	.option('layers', {
		alias: 'l',
		type: 'array',
		default: [
			'service',
			'repository',
			'controller',
			'entity',
			'model',
			'initializer',
			'router',
		],
		describe: 'Camadas a serem criadas',
	})
	.option('exclude-layer', {
		alias: 'e',
		type: 'array',
		default: [],
		describe: 'Camadas a serem ignoradas',
	})
	.option('test', {
		alias: 't',
		type: 'boolean',
		default: false,
		describe: 'Inclui arquivos de teste',
	})
	.option('directory', {
		alias: 'd',
		type: 'string',
		default: './src',
		describe: 'Diretório onde os arquivos serão criados',
	})
	.option('context', {
		alias: 'c',
		type: 'string',
		default: '',
		describe:
			'Nome para os subdiretórios dentro de cada camada, organizando os arquivos por contexto',
	})
	.help()
	.alias('help', 'h').argv;

const layers = argv.layers.filter(
	(layer) => !argv.excludeLayer.includes(layer)
);

generateStructure({
	baseName: argv.name,
	layers: layers,
	context: argv.context,
	directory: argv.directory,
});
