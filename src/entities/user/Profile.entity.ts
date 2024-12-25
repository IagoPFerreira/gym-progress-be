import { ErrorMessages } from '../../errors/catalog';
import { IProfile } from '../../interfaces';
import { validateEmail, validatePassword } from '../../validators';
import { validateData } from '../../validators/data.validate';

const {
	user: { NameLength, NameRequired },
} = ErrorMessages;

export default class ProfileEntity {
	constructor({ email, password, name }: IProfile) {
		validateEmail(email);
		validatePassword(password);
		validateData(name, 3, NameRequired, NameLength);
	}
}
