import { IExerciseAggregate, ISeries } from '../interfaces/Exercise';
import Equipment from './Equipment';
import MuscleGroup from './MuscleGroup';
import Series from './Series';

export default class ExerciseAggregate {
	readonly name: string;
	readonly series: ISeries;
	readonly equipment: string;
	readonly muscleGroup: string;
	readonly type: string;
	readonly date: string;
	readonly trainingDay: number;
	readonly observation: string;

	constructor(exercise: IExerciseAggregate) {
		const {
			name,
			series,
			equipment,
			muscleGroup,
			trainingDay,
			type,
			date,
			observation,
		} = exercise;

		this.name = name;
		this.series = series;
		this.equipment = equipment;
		this.muscleGroup = muscleGroup;
		this.type = type;
		this.date = date;
		this.trainingDay = trainingDay;
		this.observation = observation;
	}
}
