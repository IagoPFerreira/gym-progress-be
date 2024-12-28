import { stripFields } from '../../helpers';
import { IAccessoryReturn } from '../../interfaces';

export function accessorySerializer(params: IAccessoryReturn) {
	const response = stripFields(params, ['createdAt', 'updatedAt']);

	return response;
}
