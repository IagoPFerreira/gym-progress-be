import { ErrorTypes } from '../errors/catalog';
import {
	IEntity,
	IEvents,
	IRepository,
	IService,
} from '../interfaces/Generics.interface';

class Service implements IService {
	constructor(
		protected _repository: IRepository,
		protected _entity: IEntity,
		protected _serializer: (obj: any) => any = (obj) => obj
	) {}

	public async create(obj: any, events?: IEvents): Promise<any> {
		const { transaction } = events ?? {};
		new this._entity(obj);

		const created = await this._repository.create(obj, { transaction });
		if (!created) throw new Error(ErrorTypes.InfoAlreadyExists);

		return this._serializer(created);
	}

	public async read(): Promise<any[]> {
		const founded = await this._repository.read();

		if (!founded) throw new Error(ErrorTypes.ObjectNotFound);

		const cleanedFounded = founded.map((each) => this._serializer(each));

		return cleanedFounded as any;
	}

	public async readOne(id: string): Promise<any> {
		const founded = await this._repository.readOne(id);

		if (!founded) throw new Error(ErrorTypes.ObjectNotFound);

		return this._serializer(founded);
	}

	public async readBy(where: any): Promise<any> {
		const founded = await this._repository.readBy(where);

		if (!founded) throw new Error(ErrorTypes.ObjectNotFound);

		return this._serializer(founded);
	}

	public async readAllBy(where: any): Promise<any> {
		const founded = await this._repository.readAllBy(where);

		// @ts-ignore
		const cleanedFounded = founded.map((each) => this._serializer(each));

		return cleanedFounded;
	}

	public async update(id: string, obj: any, events?: IEvents): Promise<any> {
		const { transaction } = events ?? {};
		new this._entity(obj);

		const updated = await this._repository.update(id, obj, {
			transaction,
		});

		if (!updated) throw new Error(ErrorTypes.ObjectNotFound);

		return this._serializer(updated);
	}

	public async delete(id: string, events?: IEvents): Promise<boolean> {
		const { transaction } = events ?? {};
		const deleted = await this._repository.delete(id, { transaction });

		if (!deleted) throw new Error(ErrorTypes.ObjectNotFound);

		return deleted;
	}
}

export default Service;
