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

// Função principal para gerar arquivos com base no nome fornecido
function generateStructure(baseName) {
	// Diretórios onde os arquivos serão criados
	const directories = {
		service: './src/services',
		repository: './src/repositories',
		controller: './src/controllers',
		entity: './src/entities',
		initializer: './src/initializers',
		model: './src/models',
		router: './src/routes',
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
		router: routeTemplate(capitalized),
	};

	// Cria os arquivos nos diretórios correspondentes
	for (const [type, dir] of Object.entries(directories)) {
		const fileName = `${capitalize(baseName)}.${type}.ts`;
		createFile(dir, fileName, templates[type]);
	}
}

// Função para capitalizar a primeira letra
function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

// Obtém o nome do arquivo a partir dos argumentos da linha de comando
const baseName = process.argv[2];

if (!baseName) {
	console.error(
		'Erro: Você deve fornecer um nome. Exemplo: node generate-structure.js User'
	);
	process.exit(1);
}

// Gera a estrutura com base no nome fornecido
generateStructure(baseName);

function serviceTemplate(name) {
	return `import Service from './Service';\n\nexport default class ${name}Service extends Service {}`;
}

function repositoryTemplate(name) {
	return `import Repository from './Repository';
import ${name} from '../models/${name}.model';\n\nexport default class ${name}Repository extends Repository<${name}> {}`;
}

function controllerTemplate(name) {
	return `import Controller from './Controller';\n\nexport default class ${name}Controller extends Controller {}`;
}

function entityTemplate(name) {
	return `export default class ${name}Entity {
		constructor({}: any) {}
	}`;
}

function modelTemplate(name) {
	return `import { Model, DataTypes } from 'sequelize';
import db from '../index';

export default class ${name} extends Model {
	id!: number;
}

${name}.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		createdAt: {
			type: new DataTypes.DATE(),
			allowNull: false,
		},
		updatedAt: {
			type: new DataTypes.DATE(),
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: '${name}',
		underscored: true,
	}
);`;
}

function initializerTemplate(name) {
	return `import { ${name}Controller } from '../controllers';
import { ${name}Entity } from '../entities';
import { ${name}Service } from '../services';
import { ${name}Repository } from '../repositories';
import { ${name} } from '../models';

export const ${baseName}Repository = new ${name}Repository(${name});
export const ${baseName}Service = new ${name}Service(
	${baseName}Repository,
	${name}Entity
);
export const ${baseName}Controller = new ${name}Controller(${baseName}Service);`;
}

function routeTemplate(name) {
	return `import { Router } from 'express';
import { ${baseName}Controller } from '../initializers/${name}.initializer';
import { validateToken } from '../middlewares/validateToken.middleware';
import { adminRole, managementRole} from '../helpers/roles';

const router = Router();

router
	.route('/${baseName}')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, managementRole]),
		(req, res) => ${baseName}Controller.read(req, res)
	)
	.post((req, res) => ${baseName}Controller.create(req, res));

router
	.route('/${baseName}/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, managementRole]),
		(req, res) =>
			${baseName}Controller.readOne(req, res, [adminRole,	managementRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			${baseName}Controller.update(req, res, [adminRole, managementRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			${baseName}Controller.delete(req, res, [adminRole, managementRole])
	);

export default router;
`;
}
