import { ErrorMessages } from '../../errors/catalog';
import { IMuscle } from '../../interfaces';
import { validateData } from '../../validators';

const {
	exercises: { InvalidMuscleName },
	name: { NameLength },
} = ErrorMessages;

export default class MuscleEntity {
	constructor({ name }: IMuscle) {
		validateData(name, 3, InvalidMuscleName, NameLength);
	}
}
