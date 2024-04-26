import { Schema } from 'mongoose';
import Serie from '../entities/Serie.entity';

const exerciseAggregateSchema = new Schema({
	exercise: { type: String, required: true },
	series: [
		{
			repetitions: { type: Number, required: true },
			weight: {
				value: { type: Number, required: true },
				unit: { type: String, required: true },
				distribution: { type: String, required: true },
			},
			quantity: { type: Number, required: true },
			rest: {
				value: { type: Number, required: true },
				unit: { type: String, required: true },
			},
		},
	],
	equipment: { type: String, required: true },
	muscleGroup: { type: String, required: true },
	type: { type: String, required: true },
	date: { type: String, required: true },
	trainingDay: { type: Number, required: true },
	observation: { type: String, required: false },
});

export default exerciseAggregateSchema;
