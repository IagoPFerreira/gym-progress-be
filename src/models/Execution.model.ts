import executionSchema from '../schemas/Execution.schema';
import { IExecution } from '../interfaces/Exercise';
import ModelODM from './Model';

export default class ExecutionModel extends ModelODM<IExecution> {
	constructor() {
		super(executionSchema, 'Execution');
	}
}
