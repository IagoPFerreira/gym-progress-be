import Equipment from '../entities/Equipment';
import Exercise from '../entities/Exercise';
import MuscleGroup from '../entities/MuscleGroup';
import Serie from '../entities/Serie';

export interface IExerciseAggregate {
	id?: string;
	exercise: Exercise;
	equipment: Equipment;
	type: string;
	muscleGroup: MuscleGroup;
	date: string;
	trainingDay: number;
	observation?: string;
	series: Serie[];
}

export interface ISeries {
	repetitions: number;
	weight: IWeight;
	quantity: number;
	rest: IRest;
}

export interface IWeight {
	value: number;
	unit: string;
	distribution: string;
}

export interface IRest {
	value: number;
	unit: string;
}
