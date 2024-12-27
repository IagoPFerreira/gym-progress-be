import { ErrorTypes } from '../../errors/catalog';
import { IEvents, IProfile, IProfileReturn } from '../../interfaces';
import Service from '../Service';

export default class ProfileService extends Service {
	override async update(
		id: string,
		obj: IProfile,
		events?: IEvents
	): Promise<IProfileReturn> {
		const { transaction } = events ?? {};

		const updated = await this._repository.update(id, obj, {
			transaction,
		});

		if (!updated) throw new Error(ErrorTypes.ObjectNotFound);

		return this._serializer(updated);
	}
}
