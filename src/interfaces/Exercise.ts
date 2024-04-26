import Equipment from '../entities/Equipment.entity';
import Exercise from '../entities/Exercise.entity';
import MuscleGroup from '../entities/MuscleGroup.entity';
import Serie from '../entities/Serie.entity';

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

export interface IExercise {
	name: string;
}

export interface IEquipment {
	name: string;
}

export interface IMuscleGroup {
	name: string;
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
