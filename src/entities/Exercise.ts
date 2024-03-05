import { IExercise } from '../interfaces/Exercise';

export default class Exercise {
	constructor(readonly name: string) {
		if (!name || typeof name !== 'string') throw new Error('Invalid name');
		this.name = name;
	}
}
