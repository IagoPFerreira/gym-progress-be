import { stripFields } from '../../helpers';
import { IExerciseRelatedReturn } from '../../interfaces';

export function accessorySerializer(params: IExerciseRelatedReturn) {
	const response = stripFields(params, ['createdAt', 'updatedAt']);

	return response;
}
