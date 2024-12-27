import { Model, DataTypes } from 'sequelize';
import db from '../../database';

export default class Machine extends Model {
	id!: number;
	name!: string;
	createdAt!: Date;
	updatedAt!: Date;
}

Machine.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: new DataTypes.STRING(128),
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
		tableName: 'Machines',
		underscored: true,
	}
);
