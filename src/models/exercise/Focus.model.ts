import { Model, DataTypes } from 'sequelize';
import db from '../../database';

export default class Focus extends Model {
	id!: number;
	name!: string;
	createdAt!: Date;
	updatedAt!: Date;
}

Focus.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
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
		tableName: 'Focuses',
		underscored: true,
	}
);
