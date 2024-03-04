export interface IExercise {
	id?: string;
	name: string;
	series: {
		repetitions: number;
		weight: {
			value: number;
			unit: string;
			distribution: string;
		};
		number: number;
		rest: {
			value: number;
			unit: string;
		};
	};
	equipment: string;
	type: string;
	muscleGroup: string;
	date: Date;
	trainingDay: number;
	observations: string;
}
