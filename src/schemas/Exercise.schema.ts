import { Schema } from 'mongoose';
import Serie from '../entities/Serie.entity';

const exerciseAggregateSchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{ versionKey: false }
);

export default exerciseAggregateSchema;
