import bcrypt from 'bcryptjs';
import InformationError from '../errors/Information.error';
import { ErrorMessages } from '../errors/catalog';

/**
 * Gera um salt para ser usado no hash de uma informação.
 *
 * @returns {Promise<string>} O salt gerado.
 * @throws {Error} Se ocorrer um erro durante a geração do salt.
 */
export const generateSalt = async () => {
	try {
		const salt = await bcrypt.genSalt(12);
		return salt;
	} catch (err) {
		throw new Error();
	}
};

/**
 * Gera o hash de uma informação usando um salt fornecido.
 *
 * @param {string} toHash - A informação a ser hasheada.
 * @param {string} salt - O salt a ser usado na hash.
 * @returns {Promise<string>} O hash gerado.
 * @throws {Error} Se ocorrer um erro durante a geração do hash.
 */
export const generateHash = async (toHash: string, salt: string) => {
	try {
		const hash = await bcrypt.hash(toHash, salt);
		return hash;
	} catch (err) {
		throw new Error();
	}
};

/**
 * Gera um hash para a senha fornecida.
 *
 * @param {string} password - A senha a ser hasheada.
 * @returns {Promise<string>} O hash gerado para a senha.
 * @throws {Error} Se ocorrer um erro durante a geração do hash.
 */
export const hashPassword = async (password: string) => {
	try {
		const salt = await generateSalt();
		const hash = await generateHash(password, salt);
		return hash;
	} catch (err) {
		throw new Error();
	}
};

/**
 * Compara uma senha com um hash armazenado.
 *
 * @param {string} info - A informação a ser comparada.
 * @param {string} hash - O hash a ser comparado.
 * @returns {Promise<boolean>} O resultado da comparação. True se a informação corresponder ao hash, caso contrário, false.
 * @throws {Error} Se ocorrer um erro durante a comparação.
 */
export const compareHash = async (info: string, hash: string) => {
	const result = await bcrypt.compare(info, hash);
	if (!result)
		throw new InformationError(ErrorMessages.login.Unauthorized, 401);

	return result;
};
