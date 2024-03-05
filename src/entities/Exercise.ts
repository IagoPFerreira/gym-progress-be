import { IExercise } from '../interfaces/Exercise';

export default class Exercise {
	readonly name: string;

	constructor(readonly exercise: IExercise) {
		if (!exercise.name || typeof exercise.name !== 'string')
			throw new Error('Invalid name');
		this.name = exercise.name;
	}
}
