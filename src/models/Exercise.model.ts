import exerciseSchema from '../schemas/Exercise.schema';
import { IExercise } from '../interfaces/Exercise';
import ModelODM from './ModelODM';

export default class ExerciseModel extends ModelODM<IExercise> {
	constructor() {
		super(exerciseSchema, 'Exercise');
	}
}
