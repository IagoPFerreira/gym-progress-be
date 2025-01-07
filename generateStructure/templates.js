function serviceTemplate(name) {
	return `import Service from '../Service';\n\nexport default class ${name}Service extends Service {}`;
}

function repositoryTemplate(name) {
	return `import Repository from '../Repository';
import ${name} from '../models/${name}.model';\n\nexport default class ${name}Repository extends Repository<${name}> {}`;
}

function controllerTemplate(name) {
	return `import Controller from '../Controller';\n\nexport default class ${name}Controller extends Controller {}`;
}

function entityTemplate(name) {
	return `export default class ${name}Entity {
		constructor({}: any) {}
	}`;
}

function modelTemplate(name) {
	return `import { Model, DataTypes } from 'sequelize';
import db from '../../database';

export default class ${name} extends Model {
	id!: number;
	createdAt!: Date;
	updatedAt!: Date;
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
		tableName: '${name}s',
		underscored: true,
	}
);`;
}

function initializerTemplate(name, capitalized) {
	return `import { ${capitalized}Controller } from '../../controllers';
import { ${capitalized}Entity } from '../../entities';
import { ${capitalized}Service } from '../../services';
import { ${capitalized}Repository } from '../../repositories';
import { ${capitalized} } from '../../models';

export const ${name}Repository = new ${capitalized}Repository(${capitalized});
export const ${name}Service = new ${capitalized}Service(
	${name}Repository,
	${capitalized}Entity
);
export const ${name}Controller = new ${capitalized}Controller(${name}Service);`;
}

function routeTemplate(name, capitalized) {
	return `import { router } from '../Router';
import { ${name}Controller } from '../../initializers/${capitalized}.initializer';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';

router
	.route('/${name}')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) => ${name}Controller.read(req, res)
	)
	.post((req, res) => ${name}Controller.create(req, res));

router
	.route('/${name}/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) =>
			${name}Controller.readOne(req, res, [adminRole,	moderatorRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			${name}Controller.update(req, res, [adminRole, moderatorRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			${name}Controller.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
`;
}

function indexTemplate(capitalized, layer, capitalizedLayer) {
	return `import ${capitalized}${capitalizedLayer} from './${capitalized}.${layer}'

export { ${capitalized}${capitalizedLayer} };`;
}

module.exports = {
	serviceTemplate,
	repositoryTemplate,
	controllerTemplate,
	entityTemplate,
	modelTemplate,
	initializerTemplate,
	routeTemplate,
	indexTemplate,
};
