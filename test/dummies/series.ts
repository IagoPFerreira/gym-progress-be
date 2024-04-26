export const serieWithoutRepetition = {
	weight: {
		value: 10,
		unit: 'kg',
		distribution: 'cada lado',
	},
	quantity: 4,
	rest: {
		value: 1,
		unit: 'min',
	},
};

export const serieWithInvalidWeights = [
	{
		repetitions: 10,
		quantity: 4,
		rest: {
			value: 1,
			unit: 'min',
		},
	},
	{
		repetitions: 10,
		weight: {
			unit: 'kg',
			distribution: 'cada lado',
		},
		quantity: 4,
		rest: {
			value: 1,
			unit: 'min',
		},
	},
	{
		repetitions: 10,
		weight: {
			value: 10,
			distribution: 'cada lado',
		},
		quantity: 4,
		rest: {
			value: 1,
			unit: 'min',
		},
	},
	{
		repetitions: 10,
		weight: {
			value: 10,
			unit: 'kg',
		},
		quantity: 4,
		rest: {
			value: 1,
			unit: 'min',
		},
	},
];

export const serieWithoutQuantity = {
	repetitions: 10,
	weight: {
		value: 10,
		unit: 'kg',
		distribution: 'cada lado',
	},
	rest: {
		value: 1,
		unit: 'min',
	},
};

export const serieWithInvalidRests = [
	{
		repetitions: 10,
		weight: {
			value: 10,
			unit: 'kg',
			distribution: 'cada lado',
		},
		quantity: 4,
	},
	{
		repetitions: 10,
		weight: {
			value: 10,
			unit: 'kg',
			distribution: 'cada lado',
		},
		quantity: 4,
		rest: {
			unit: 'min',
		},
	},
	{
		repetitions: 10,
		weight: {
			value: 10,
			unit: 'kg',
			distribution: 'cada lado',
		},
		quantity: 4,
		rest: {
			value: 1,
		},
	},
];
