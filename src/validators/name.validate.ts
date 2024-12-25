import InformationError from '../errors/Information.error';
import { ErrorMessages } from '../errors/catalog';

/**
 * Valida o nome fornecido.
 *
 * @param {string} name - O nome a ser validado.
 * @throws {Error} Se o nome não for fornecido.
 * @throws {Error} Se o nome tiver menos de 3 caracteres.
 * @returns {void}
 */
export function validateName(name: string) {
	if (!name) throw new InformationError(ErrorMessages.user.NameRequired);
	if (name.length < 3)
		throw new InformationError(ErrorMessages.user.NameLength);
}
