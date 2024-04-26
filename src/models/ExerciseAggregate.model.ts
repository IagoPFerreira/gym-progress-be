import exerciseAggregateSchema from '../Schemas/ExerciseAggregate.schema';
import { IExerciseAggregate } from '../interfaces/Exercise';
import ModelODM from './ModelODM';

export default class ExerciseAggregateModel extends ModelODM<IExerciseAggregate> {
	constructor() {
		super(exerciseAggregateSchema, 'ExerciseAggregate');
	}
}