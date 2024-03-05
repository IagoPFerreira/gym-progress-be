import { IExercise } from '../interfaces/Exercise';

export default class Exercise {
	readonly id?: string;
	readonly name: string;

	constructor(readonly exercise: IExercise) {
		if (exercise.id) this.id = exercise.id;
		if (!exercise.name || typeof exercise.name !== 'string')
			throw new Error('Invalid name');
		this.name = exercise.name;
	}
}
