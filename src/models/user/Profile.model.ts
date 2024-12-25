import { Model, DataTypes } from 'sequelize';
import db from '../../database';

export default class Profile extends Model {
	id!: number;
	name!: string;
	email!: string;
	password!: string;
	role!: string;
	createdAt!: Date;
	updatedAt!: Date;
}

Profile.init(
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
		email: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		password: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		role: {
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
		tableName: 'Profiles',
		underscored: true,
	}
);
