import InformationError from '../errors/InformationError';
import { ErrorMessages } from '../errors/catalog';

export default class MuscleGroupEntity {
	constructor(readonly name: string) {
		if (!name || typeof name !== 'string')
			throw new InformationError(ErrorMessages.InvalidMuscleGroupName);
		this.name = name;
	}
}
