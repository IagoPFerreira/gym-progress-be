import InformationError from '../errors/InformationError';
import { ErrorMessages } from '../errors/catalog';
import {
	IEquipment,
	IExercise,
	IExerciseAggregate,
	IMuscleGroup,
	ISeries,
} from '../interfaces/Exercise';
import ExerciseEntity from './Exercise.entity';

export default class ExerciseAggregateEntity {
	readonly exercise: string;
	readonly series: ISeries[];
	readonly equipment: IEquipment;
	readonly muscleGroup: IMuscleGroup;
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

		this.exercise = new ExerciseEntity({ name: exercise }).name;
		this.series = series;
		this.equipment = equipment;
		this.muscleGroup = muscleGroup;
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
		if (!type || typeof type !== 'string')
			throw new InformationError(ErrorMessages.InvalidType);
	}

	private validateDate(date: string) {
		if (!date || typeof date !== 'string')
			throw new InformationError(ErrorMessages.InvalidDate);
	}

	private validateTrainingDay(trainingDay: number) {
		if (!trainingDay || typeof trainingDay !== 'number')
			throw new InformationError(ErrorMessages.InvalidTrainingDay);
	}

	private validateObservation(observation: string | undefined) {
		if (observation === undefined || typeof observation !== 'string')
			throw new InformationError(ErrorMessages.InvalidObservation);
	}
}
