import { CreateOptions } from 'sequelize';
import { Profile } from '../../models';
import Repository from '../Repository';
import { ErrorTypes } from '../../errors/catalog';
import { hashPassword } from '../../helpers';
import InformationError from '../../errors/Information.error';

export default class ProfileRepository extends Repository<Profile> {
	async create(data: any, options?: CreateOptions): Promise<any | boolean> {
		data.role = 'usuário';
		data.password = await hashPassword(data.password);
		try {
			const exists = await this._model.findOne({ where: data });

			return exists ? false : await this._model.create(data, options);
		} catch (error: Error | any) {
			throw new Error(error.message);
		}
	}
}
