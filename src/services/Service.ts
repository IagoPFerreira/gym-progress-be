import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

abstract class Service<T, E> implements IService<T> {
	constructor(private _model: IModel<T>, private entity: new (obj: T) => E) {}

	public async create(obj: T): Promise<T> {
		const instancedObj = new this.entity(obj);

		return this._model.create(instancedObj as unknown as T);
	}

	public async read(): Promise<T[]> {
		const founded = await this._model.read();

		if (!founded) throw new Error(ErrorTypes.ObjectNotFound);

		return founded;
	}

	public async readOne(id: string): Promise<T> {
		const founded = await this._model.readOne(id);

		if (!founded) throw new Error(ErrorTypes.ObjectNotFound);

		return founded;
	}

	public async update(id: string, obj: T): Promise<T> {
		const instancedObj = new this.entity(obj);

		const updated = await this._model.update(id, instancedObj as unknown as T);

		if (!updated) throw new Error(ErrorTypes.ObjectNotFound);

		return obj;
	}

	public async delete(id: string): Promise<T> {
		const deleted = await this._model.delete(id);

		if (!deleted) throw new Error(ErrorTypes.ObjectNotFound);

		return deleted;
	}
}

export default Service;
