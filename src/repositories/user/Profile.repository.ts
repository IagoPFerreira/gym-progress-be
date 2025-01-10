import { CreateOptions } from 'sequelize';
import { Profile } from '../../models';
import Repository from '../Repository';
import { hashPassword } from '../../helpers';

export default class ProfileRepository extends Repository {
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
