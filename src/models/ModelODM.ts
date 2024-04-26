import { Schema, models, model, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

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
		const [exercise] = await this._entity.create([obj]);
		return exercise;
	}
}
