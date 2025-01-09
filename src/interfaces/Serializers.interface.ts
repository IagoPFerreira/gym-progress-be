export interface IExerciseRelated {
	name: string;
}

export interface IExerciseRelatedReturn extends IExerciseRelated {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}
