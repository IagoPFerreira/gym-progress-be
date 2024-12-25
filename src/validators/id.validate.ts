import InformationError from '../errors/Information.error';
import { ErrorMessages } from '../errors/catalog';

/**
 * Valida se o ID fornecido é válido.
 *
 * @param {string|number} id - O ID a ser validado.
 * @throws {Error} Se o ID não for fornecido.
 * @throws {Error} Se o ID não for um número válido ou menor que 1.
 * @returns {boolean} Retorna verdadeiro se o ID for válido.
 */
export function validateId(id: string | number) {
	if (!id && id !== 0) throw new InformationError(ErrorMessages.id.IdRequired);
	if (Number.isNaN(Number(id)) || Number(id) < 1)
		throw new InformationError(ErrorMessages.id.IdInvalid);
	return true;
}
