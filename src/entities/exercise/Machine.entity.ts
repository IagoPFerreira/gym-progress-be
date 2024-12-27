import { ErrorMessages } from '../../errors/catalog';
import { IMachine } from '../../interfaces';
import { validateData } from '../../validators';

const {
	name: { NameLength, NameRequired },
} = ErrorMessages;

export default class MachineEntity {
	constructor({ name }: IMachine) {
		validateData(name, 3, NameRequired, NameLength);
	}
}
