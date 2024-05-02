import InformationError from '../errors/InformationError';
import { ErrorMessages } from '../errors/catalog';

export default class ExerciseEntity {
	constructor(readonly name: string) {
		if (!name || typeof name !== 'string')
			throw new InformationError(ErrorMessages.InvalidExerciseName);
		this.name = name;
	}
}
