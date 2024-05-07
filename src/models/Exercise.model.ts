import exerciseAggregateSchema from '../schemas/ExerciseAggregate.schema';
import { IExercise } from '../interfaces/Exercise';
import ModelODM from './ModelODM';

export default class ExerciseModel extends ModelODM<IExercise> {
	constructor() {
		super(exerciseAggregateSchema, 'ExerciseAggregate');
	}
}
