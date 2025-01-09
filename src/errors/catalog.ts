export enum ErrorTypes {
	InvalidInfo = 'InvalidInfo',
	ObjectNotFound = 'ObjectNotFound',
	EmailExists = 'EmailExists',
	InfoAlreadyExists = 'InfoAlreadyExists',
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
	ObjectNotFound: {
		message: 'Object not found',
		httpStatus: 404,
	},
	EmailExists: {
		message: 'Email already exists',
		httpStatus: 409,
	},
	InfoAlreadyExists: {
		message: 'Information already exists',
		httpStatus: 409,
	},
};

export const ErrorMessages = {
	exercises: {
		InvalidMuscleName: 'Invalid muscle group name',
	},
	id: {
		IdInvalid: 'Id must be a number greater than 0',
		IdRequired: 'Id is required',
	},
	login: {
		JwtMalformed: 'jwt malformed',
		MissingAuthToken: 'Missing auth token',
		Unauthorized: 'Unauthorized',
	},
	name: {
		NameLength: 'Name must have at least 3 characters',
		NameRequired: 'Name is required',
	},
	status: {
		StatusInvalid: 'Invalid status',
		StatusRequired: 'Status is required',
	},
	type: {
		TypeInvalid: 'Invalid type',
		TypeLength: 'Type must have at least 3 characters',
		TypeRequired: 'Type is required',
	},
	user: {
		CnpjInvalid: 'Invalid CNPJ',
		CpfInvalid: 'Invalid CPF',
		CpfOrCnpjRequired: 'CPF or CNPJ is required',
		EmailInvalid: 'Invalid email',
		EmailRequired: 'Email is required',
		InvalidCredentials: 'Invalid credentials',
		NameLength: 'User name must have at least 3 characters',
		NameRequired: 'User name is required',
		PasswordInvalid: 'Invalid password',
		PasswordLength: 'Password must be at least 6 characters',
		PasswordRequired: 'Password is required',
		PhoneLength: 'Phone must have at least 10 characters',
		PhoneRequired: 'Phone is required',
		RoleInvalid: 'Invalid role',
		RoleRequired: 'Role is required',
	},
};
