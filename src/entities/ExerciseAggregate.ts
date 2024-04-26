import { IExerciseAggregate, ISeries } from '../interfaces/Exercise';

export default class ExerciseAggregate {
	readonly exercise: string;
	readonly series: ISeries[];
	readonly equipment: string;
	readonly muscleGroup: string;
	readonly type: string;
	readonly date: string;
	readonly trainingDay: number;
	readonly observation: string;

	constructor(exerciseAggregate: IExerciseAggregate) {
		const {
			exercise,
			series,
			equipment,
			muscleGroup,
			trainingDay,
			type,
			date,
			observation,
		} = exerciseAggregate;

		this.exercise = exercise.name;
		this.series = series;
		this.equipment = equipment.name;
		this.muscleGroup = muscleGroup.name;
		this.validateType(type);
		this.type = type;
		this.validateDate(date);
		this.date = date;
		this.validateTrainingDay(trainingDay);
		this.trainingDay = trainingDay;
		this.validateObservation(observation);
		// @ts-ignore
		this.observation = observation;
	}

	private validateType(type: string) {
		if (!type || typeof type !== 'string') throw new Error('Invalid type');
	}

	private validateDate(date: string) {
		if (!date || typeof date !== 'string') throw new Error('Invalid date');
	}

	private validateTrainingDay(trainingDay: number) {
		if (!trainingDay || typeof trainingDay !== 'number')
			throw new Error('Invalid training day');
	}

	private validateObservation(observation: string | undefined) {
		if (observation === undefined || typeof observation !== 'string')
			throw new Error('Invalid observation');
	}
}