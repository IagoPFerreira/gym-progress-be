import ExerciseEntity from '../entities/Exercise.entity';
import { IExercise } from '../interfaces/Exercise';
import Service from './Service';

export default class ExerciseService extends Service<
	IExercise,
	ExerciseEntity
> {}
