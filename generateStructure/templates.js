function serviceTemplate(name) {
	return `import Service from '../Service';\n\nexport default class ${name}Service extends Service {}`;
}

function repositoryTemplate(name) {
	return `import Repository from '../Repository';
import { ${name} } from '../../models';\n\nexport default class ${name}Repository extends Repository<${name}> {}`;
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

function initializerTemplate(capitalized) {
	return `import { ${capitalized}Controller } from '../../controllers';
import { ${capitalized}Entity } from '../../entities';
import { ${capitalized}Service } from '../../services';
import { ${capitalized}Repository } from '../../repositories';
import { ${capitalized} } from '../../models';

export const repository = new ${capitalized}Repository(${capitalized});
export const service = new ${capitalized}Service(
	repository,
	${capitalized}Entity
);
export const controller = new ${capitalized}Controller(service);`;
}

function routeTemplate(name, capitalized) {
	return `import { router } from '../Router';
import { ${capitalized} } from '../../initializers';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';

router
	.route('/${name}')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) => ${capitalized}.controller.read(req, res)
	)
	.post((req, res) => ${capitalized}.controller.create(req, res));

router
	.route('/${name}/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) =>
			${capitalized}.controller.readOne(req, res, [adminRole,	moderatorRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			${capitalized}.controller.update(req, res, [adminRole, moderatorRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			${capitalized}.controller.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
`;
}

function indexTemplate(capitalized, layer, capitalizedLayer) {
	return `import ${capitalized}${capitalizedLayer} from './${capitalized}.${layer}'

export { ${capitalized}${capitalizedLayer} };`;
}

function indexInitializerTemplate(capitalized) {
	return `import * as ${capitalized} from './${capitalized}.initializer'

export { ${capitalized} };`;
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
	indexInitializerTemplate,
};
