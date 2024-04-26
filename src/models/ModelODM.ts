import {
	Schema,
	models,
	model,
	Model,
	isValidObjectId,
	UpdateQuery,
} from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default abstract class ModelODM<T> implements IModel<T> {
	protected _entity: Model<T>;
	protected schema: Schema;
	protected modelName: string;

	constructor(schema: Schema, modelName: string) {
		this.schema = schema;
		this.modelName = modelName;
		this._entity = models[this.modelName] || model(this.modelName, this.schema);
	}

	public async create(obj: T): Promise<T> {
		try {
			const [exercise] = await this._entity.create([obj]);
			return exercise;
		} catch (error) {
			throw Error(ErrorTypes.InvalidInfo);
		}
	}

	public async read(): Promise<T[]> {
		return this._entity.find();
	}

	public async readOne(_id: string): Promise<T | null> {
		if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
		return this._entity.findById(_id);
	}

	public async update(_id: string, obj: T): Promise<T | null> {
		if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

		return this._entity.findOneAndUpdate({ _id }, obj as UpdateQuery<T>);
	}
}
