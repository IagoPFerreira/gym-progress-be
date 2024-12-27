import { ErrorMessages } from '../../errors/catalog';
import { IAccessory } from '../../interfaces';
import { validateData } from '../../validators';

const {
	name: { NameLength, NameRequired },
} = ErrorMessages;

export default class AccessoryEntity {
	constructor({ name }: IAccessory) {
		validateData(name, 3, NameRequired, NameLength);
	}
}
