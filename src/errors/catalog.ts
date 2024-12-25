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
	address: {
		AddressLength: 'Address must have at least 3 characters',
		AddressRequired: 'Address is required',
		CityLength: 'City must have at least 3 characters',
		CityRequired: 'City is required',
		CountryLength: 'Country must have at least 3 characters',
		CountryRequired: 'Country is required',
		NeighborhoodLength: 'Neighborhood must have at least 3 characters',
		NeighborhoodRequired: 'Neighborhood is required',
		NumberInvalid: 'Invalid number',
		NumberLength: 'Number must have at least 1 character',
		NumberRequired: 'Number is required',
		PostalCodeInvalid: 'Invalid postal code',
		PostalCodeLength: 'Postal code must have at least 8 characters',
		PostalCodeRequired: 'Postal code is required',
		StateInvalid: 'Invalid state',
		StateLength: 'State must have at least 2 characters',
		StateRequired: 'State is required',
		UfInvalid: 'Invalid UF',
		UfLength: 'UF must have at least 2 characters',
		UfRequired: 'UF is required',
	},
	analysis: {
		MaxValueInvalid: 'Invalid maximum value',
		MaxValueRequired: 'Maximum value is required',
		MinValueInvalid: 'Invalid minimum value',
		MinValueRequired: 'Minimum value is required',
		ObservationsLength: 'Observations must have at least 1 character',
		ObservationsRequired: 'Observations are required',
		VisitationDateInvalid: 'Invalid visitation date',
		VisitationDateRequired: 'Visitation date is required',
	},
	assets: {
		AreaLegalReserveInvalid: 'Invalid area of legal reserve',
		AreaLegalReserveLength:
			'Area of legal reserve must have at least 1 character',
		AreaLegalReserveRequired: 'Area of legal reserve is required',
		AreaNativeVegInvalid: 'Invalid area of native vegetation',
		AreaNativeVegLength:
			'Area of native vegetation must have at least 1 character',
		AreaNativeVegRequired: 'Area of native vegetation is required',
		AreaUsageInvalid: 'Invalid area of usage',
		AreaUsageLength: 'Area of usage must have at least 1 character',
		AreaUsageRequired: 'Area of usage is required',
		MainVegetationTypeInvalid: 'Invalid main vegetation type',
		MainVegetationTypeLength:
			'Main vegetation type must have at least 3 characters',
		MainVegetationTypeRequired: 'Main vegetation type is required',
		TotalAssetsInvalid: 'Invalid total assets',
		TotalAssetsLength: 'Total assets must have at least 1 character',
		TotalAssetsRequired: 'Total assets are required',
		TotalConservAssetsInvalid: 'Invalid total conservation assets',
		TotalConservAssetsLength:
			'Total conservation assets must have at least 1 character',
		TotalConservAssetsRequired: 'Total conservation assets are required',
	},
	contract: {
		AssetsContractedInvalid: 'Invalid assets contracted',
		AssetsContractedLength: 'Assets contracted must have at least 1 character',
		AssetsContractedRequired: 'Assets contracted are required',
		EndDateInvalid: 'Invalid end date',
		EndDateRequired: 'End date is required',
		ProductiveActivitiesAreaInvalid: 'Invalid production activity area',
		ProductiveActivitiesAreaRequired: 'Production activity area is required',
		ProductiveActivitiesAreaSmall:
			'Production activity area must be greater than 0',
		ProductiveActivitiesLength:
			'Production activity must have at least 3 characters',
		ProductiveActivitiesRequired: 'Productive activities are required',
		ProjectLength: 'Project must have at least 3 characters',
		ProjectRequired: 'Project is required',
		StartDateInvalid: 'Invalid start date',
		StartDateRequired: 'Start date is required',
		TitleLength: 'Title must have at least 3 characters',
		TitleRequired: 'Title is required',
		ValuePerHaInvalid: 'Invalid value per hectare',
		ValuePerHaLength: 'Value per hectare must have at least 1 character',
		ValuePerHaRequired: 'Value per hectare is required',
	},
	field: {
		LatitudeNumber: 'Latitude must be a number',
		LatitudeInvalid: 'Invalid latitude',
		LongitudeNumber: 'Longitude must be a number',
		LongitudeInvalid: 'Invalid longitude',
	},
	file: {
		FileDestinationRequired: 'File destination is required',
		FilenameRequired: 'Filename is required',
		FilePathDestinationMismatch: 'File path and destination do not match',
		FilePathRequired: 'File path is required',
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
	notification: {
		DateInvalid: 'Invalid date',
		DateRequired: 'Date is required',
		MessageLength: 'Message must have at least 3 characters',
		MessageRequired: 'Message is required',
		ReadInvalid: 'Invalid read type, must be a boolean',
		TypeLength: 'Type must have at least 3 characters',
		TypeRequired: 'Type is required',
		UserIdInvalid: 'Invalid user id',
		UserIdRequired: 'User id is required',
	},
	payment: {
		PaymentDateInvalid: 'Invalid payment date',
		PaymentDateRequired: 'Payment date is required',
		PaymentSplitRequired: 'Payment split is required',
		PercentageInvalid: 'Invalid percentage',
		PercentageLength: 'Percentage must have at least 1 character',
		PercentageRequired: 'Percentage is required',
	},
	project: {
		NameLength: 'Name must have at least 3 characters',
		NameRequired: 'Name is required',
		SponsorLength: 'Sponsor must have at least 3 characters',
		SponsorRequired: 'Sponsor is required',
	},
	property: {
		CarCodeLength: 'CAR code must have at least 43 characters',
		CarCodeRequired: 'CAR code is required',
		IBGECodeLength: 'IBGE code must have at least 7 characters',
		IBGECodeRequired: 'IBGE code is required',
		IncraCodeAlreadyExists: 'INCRA code already exists',
		IncraCodeLength: 'INCRA code must have at least 8 characters',
		IncraCodeRequired: 'INCRA code is required',
		PropertyNameLength: 'Property name must have at least 3 characters',
		PropertyNameRequired: 'Property name is required',
		PropertyRegistrationLength:
			'Property registration must have at least 3 characters',
		PropertyRegistrationRequired: 'Property registration is required',
		PropertyRegistrationAlreadyExists: 'Property registration already exists',
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
		NameLength: 'Name must be at least 3 characters',
		NameRequired: 'Name is required',
		PasswordInvalid: 'Invalid password',
		PasswordLength: 'Password must be at least 6 characters',
		PasswordRequired: 'Password is required',
		PhoneLength: 'Phone must have at least 10 characters',
		PhoneRequired: 'Phone is required',
		RoleInvalid: 'Invalid role',
		RoleRequired: 'Role is required',
	},
};
