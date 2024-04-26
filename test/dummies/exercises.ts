export const supino = {
	exercise: 'supino',
	series: [
		{
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
	],
	equipment: 'barra',
	type: 'força',
	muscleGroup: 'peitoral',
	date: '06/03/2024',
	trainingDay: 1,
	observation: 'nenhuma',
};

export const criadoModelSupino = {
	_id: '6321e977c705e38f871148ce',
	exercise: 'supino',
	series: [
		{
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
	],
	equipment: 'barra',
	type: 'força',
	muscleGroup: 'peitoral',
	date: '06/03/2024',
	trainingDay: 1,
	observation: 'nenhuma',
};

export const todosExerciciosModel = [
	{
		_id: '6321e977c705e38f871148ce',
		exercise: 'supino',
		series: [
			{
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
		],
		equipment: 'barra',
		type: 'força',
		muscleGroup: 'peitoral',
		date: '06/03/2024',
		trainingDay: 1,
		observation: 'nenhuma',
	},
	{
		_id: '6321e977c705e38f871148cf',
		name: 'rosca direta',
		series: [
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
					unit: 'min',
				},
			},
		],
		equipment: 'halter',
		type: 'força',
		muscleGroup: 'bíceps',
		date: '11/03/2024',
		trainingDay: 1,
		observation: 'nenhuma',
	},
];

export const roscaDireta = {
	name: 'rosca direta',
	series: [
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
				unit: 'min',
			},
		},
	],
	equipment: 'halter',
	type: 'força',
	muscleGroup: 'bíceps',
	date: '11/03/2024',
	trainingDay: 1,
	observation: 'nenhuma',
};
