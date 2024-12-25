import {
	CreateOptions,
	DestroyOptions,
	Model,
	ModelCtor,
	UpdateOptions,
} from 'sequelize';
import { ErrorTypes } from '../errors/catalog';
import { validateId } from '../validators';
import { IRepository } from '../interfaces/Generics.interface';
import InformationError from '../errors/Information.error';

class Repository<ModelType extends Model> implements IRepository {
	protected _model: ModelCtor<ModelType>;
	constructor(model: ModelCtor<ModelType>) {
		this._model = model;
	}

	async create(data: any, options?: CreateOptions): Promise<any | boolean> {
		try {
			const exists = await this._model.findOne({ where: data });

			return exists ? false : await this._model.create(data, options);
		} catch (error: Error | any) {
			throw new InformationError(error.message);
		}
	}

	async read(): Promise<any[]> {
		try {
			const founded = await this._model.findAll({
				include: {
					all: true,
					attributes: { exclude: ['createdAt', 'updatedAt'] },
				},
			});
			return founded;
		} catch (error) {
			// @ts-ignore
			throw new Error(error.message);
		}
	}

	async readOne(id: string): Promise<any | null> {
		validateId(id);

		try {
			return await this._model.findByPk(id, {
				include: {
					all: true,
					attributes: { exclude: ['createdAt', 'updatedAt'] },
				},
			});
		} catch (error) {
			throw new Error(ErrorTypes.ObjectNotFound);
		}
	}

	async readBy(where: any): Promise<any | null> {
		try {
			return await this._model.findOne({ where });
		} catch (error) {
			throw new Error(ErrorTypes.ObjectNotFound);
		}
	}

	async readAllBy(where: any): Promise<any | null> {
		try {
			return await this._model.findAll({
				where,
				include: {
					all: true,
					attributes: { exclude: ['createdAt', 'updatedAt'] },
				},
			});
		} catch (error) {
			throw new Error(ErrorTypes.ObjectNotFound);
		}
	}

	async update(
		id: string | number,
		obj: any,
		options?: Omit<UpdateOptions, 'where'>
	): Promise<any | null> {
		validateId(id);
		try {
			let updated: any;

			await this._model.update(obj, { where: { id }, ...options });

			updated = await this._model.findByPk(id, {
				attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
			});

			return updated;
		} catch (error: Error | any) {
			throw new InformationError(error.message);
		}
	}

	async delete(
		id: string | number,
		options?: DestroyOptions
	): Promise<boolean | null> {
		validateId(id);
		try {
			const deleted = await this._model.destroy({
				where: { id: Number(id) },
				...options,
			});

			return !!deleted;
		} catch (error) {
			// @ts-ignore
			throw new Error(error.message);
		}
	}

	async updateStatus(
		id: string,
		status: string,
		options?: UpdateOptions
	): Promise<any> {
		try {
			await this._model.update(
				{ status },
				{
					where: { id },
					...options,
				}
			);
			return await this._model.findOne({
				where: { id },
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});
		} catch (error) {
			// @ts-ignore
			throw new Error(error.message);
		}
	}
}

export default Repository;
