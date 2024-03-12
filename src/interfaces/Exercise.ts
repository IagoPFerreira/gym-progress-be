export interface IExerciseAggregate {
	id?: string;
	name: string;
	equipment: string;
	type: string;
	muscleGroup: string;
	date: Date;
	trainingDay: number;
	observation: string;
	series: ISeries;
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
