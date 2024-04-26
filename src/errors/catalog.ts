export enum ErrorTypes {
	InvalidInfo = 'InvalidInfo',
	InvalidMongoId = 'InvalidMongoId',
	ObjectNotFound = 'ObjectNotFound',
}

type ErrorResponseObject = {
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
