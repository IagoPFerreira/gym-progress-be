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

generateStructure({
	baseName: argv.name,
	layers: argv.layers,
	context: argv.context,
	directory: argv.directory,
});
