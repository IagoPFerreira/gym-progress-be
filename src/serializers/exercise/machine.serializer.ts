import { stripFields } from '../../helpers';
import { IExerciseRelatedReturn } from '../../interfaces';

export function machineSerializer(params: IExerciseRelatedReturn) {
	const response = stripFields(params, ['createdAt', 'updatedAt']);

	return response;
}
