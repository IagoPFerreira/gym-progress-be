export interface IExerciseAggregate extends ISeries {
	id?: string;
	name: string;
	equipment: string;
	type: string;
	muscleGroup: string;
	date: Date;
	trainingDay: number;
	observations: string;
}

export interface ISeries {
	repetitions: number;
	weight: {
		value: number;
		unit: string;
		distribution: string;
	};
	quantity: number;
	rest: {
		value: number;
		unit: string;
	};
}
