import { IExercise } from '../interfaces/Exercise';

export default class Exercise {
	readonly id?: string;
	readonly name: string;
	readonly equipment: string;
	readonly type: string;
	readonly muscleGroup: string;
	readonly date: Date;
	readonly trainingDay: number;
	readonly observations: string;
	constructor(readonly exercise: IExercise) {
		this.id = exercise.id;
		this.name = exercise.name;
		this.equipment = exercise.equipment;
		this.type = exercise.type;
		this.muscleGroup = exercise.muscleGroup;
		this.date = exercise.date;
		this.trainingDay = exercise.trainingDay;
		this.observations = exercise.observations;
	}
}
