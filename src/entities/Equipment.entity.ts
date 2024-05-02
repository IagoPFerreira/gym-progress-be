import InformationError from '../errors/InformationError';
import { ErrorMessages } from '../errors/catalog';

export default class EquipmentEntity {
	constructor(readonly name: string) {
		if (!name || typeof name !== 'string')
			throw new InformationError(ErrorMessages.InvalidEquipmentName);
		this.name = name;
	}
}
