import { Schema } from 'mongoose';
import Serie from '../entities/Serie.entity';

const exerciseSchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{ versionKey: false }
);

export default exerciseSchema;
