import InformationError from '../errors/InformationError';
import { ErrorMessages } from '../errors/catalog';
import { IExercise } from '../interfaces/Exercise';

export default class ExerciseEntity {
	readonly name: string;
	constructor(exercise: IExercise) {
		if (!exercise || !exercise.name || typeof exercise.name !== 'string') {
			throw new InformationError(ErrorMessages.InvalidExerciseName);
		}
		this.name = exercise.name;
	}
}
