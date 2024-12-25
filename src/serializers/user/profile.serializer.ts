import { stripFields } from '../../helpers';
import { IProfileReturn } from '../../interfaces';

export function profileSerializer(params: IProfileReturn) {
	const response = stripFields(params, ['password', 'createdAt', 'updatedAt']);

	return response;
}
