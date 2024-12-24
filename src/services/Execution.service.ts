import ExecutionEntity from '../entities/Execution.entity';
import { IExecution } from '../interfaces/Exercise';
import Service from './Service';

export default class ExecutionService extends Service<
	IExecution,
	ExecutionEntity
> {}
