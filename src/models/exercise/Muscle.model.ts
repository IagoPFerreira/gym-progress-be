import { Model, DataTypes } from 'sequelize';
import db from '../../database';

export default class Muscle extends Model {
	id!: number;
	name!: string;
	createdAt!: Date;
	updatedAt!: Date;
}

Muscle.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: new DataTypes.STRING(255),
			allowNull: false,
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
		tableName: 'Muscles',
		underscored: true,
	}
);
