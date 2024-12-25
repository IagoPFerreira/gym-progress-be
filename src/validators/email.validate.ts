import InformationError from '../errors/Information.error';
import { ErrorMessages } from '../errors/catalog';

/**
 * Valida o email fornecido.
 *
 * @param {string} email - O email a ser validado.
 * @throws {Error} Se o email não for fornecido.
 * @throws {Error} Se o email for inválido.
 * @returns {void}
 */
export function validateEmail(email: string) {
	const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
	if (!email) throw new InformationError(ErrorMessages.user.EmailRequired);
	if (!regex.test(email))
		throw new InformationError(ErrorMessages.user.EmailInvalid);
}
