import { stripFields } from '../../helpers';
import { IMachineReturn } from '../../interfaces';

export function machineSerializer(params: IMachineReturn) {
	const response = stripFields(params, ['createdAt', 'updatedAt']);

	return response;
}
