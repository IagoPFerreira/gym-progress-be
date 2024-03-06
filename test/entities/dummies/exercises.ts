export const supino = {
	name: 'supino',
	series: {
		repetitions: 10,
		weight: {
			value: 20,
			unit: 'kg',
			distribution: 'cada lado',
		},
		quantity: 4,
		rest: {
			value: 1,
			unit: 'min',
		},
	},
	equipment: 'barra',
	type: 'força',
	muscleGroup: 'peitoral',
	date: new Date(),
	trainingDay: 1,
	observation: 'nenhuma',
};

export const roscaDireta = {
	name: 'rosca direta',
	series: {
		repetitions: 10,
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
	},
	equipment: 'halter',
	type: 'força',
	muscleGroup: 'bíceps',
	date: new Date(),
	trainingDay: 1,
	observation: 'nenhuma',
};
