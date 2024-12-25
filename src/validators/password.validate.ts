import InformationError from '../errors/Information.error';
import { ErrorMessages } from '../errors/catalog';

/**
 * Valida a senha fornecida.
 *
 * @param {string} password - A senha a ser validada.
 * @throws {Error} Se a senha não for fornecida.
 * @throws {Error} Se a senha tiver menos de 8 caracteres.
 * @throws {Error} Se a senha não atender aos critérios de complexidade.
 * @returns {void}
 */
export function validatePassword(password: string) {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
	if (!password)
		throw new InformationError(ErrorMessages.user.PasswordRequired);
	if (password.length < 8)
		throw new InformationError(ErrorMessages.user.PasswordLength);
	if (!regex.test(password))
		throw new InformationError(ErrorMessages.user.PasswordInvalid);
}
