export enum ErrorTypes {
	InvalidInfo = 'InvalidInfo',
	InvalidMongoId = 'InvalidMongoId',
	ObjectNotFound = 'ObjectNotFound',
}

export type ErrorResponseObject = {
	message: string;
	httpStatus: number;
};

export type ErrorCatalog = {
	[key in ErrorTypes]: ErrorResponseObject;
};

export const errorCatalog: ErrorCatalog = {
	InvalidInfo: {
		message: 'Invalid information',
		httpStatus: 400,
	},
	InvalidMongoId: {
		message: 'Id must have 24 hexadecimal characters',
		httpStatus: 400,
	},
	ObjectNotFound: {
		message: 'Object not found',
		httpStatus: 404,
	},
};

export enum ErrorMessages {
	InvalidDate = 'Invalid date',
	InvalidEquipmentName = 'Invalid equipment name',
	InvalidExerciseName = 'Invalid exercise name',
	InvalidQuantity = 'Invalid quantity',
	InvalidMuscleGroupName = 'Invalid muscle group name',
	InvalidObservation = 'Invalid observation',
	InvalidRepetitions = 'Invalid repetitions',
	InvalidRest = 'Invalid rest',
	InvalidSeries = 'Invalid series',
	InvalidTrainingDay = 'Invalid training day',
	InvalidType = 'Invalid type',
	InvalidWeight = 'Invalid weight',
}
