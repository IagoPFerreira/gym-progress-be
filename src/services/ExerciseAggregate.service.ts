import ExerciseAggregateEntity from '../entities/ExerciseAggregate.entity';
import { IExerciseAggregate } from '../interfaces/Exercise';
import Service from './Service';

export default class ExerciseAggregateService extends Service<
	IExerciseAggregate,
	ExerciseAggregateEntity
> {}
