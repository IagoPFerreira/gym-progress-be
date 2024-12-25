import InformationError from '../errors/Information.error';

/**
 * Valida o dado fornecido com base no comprimento e mensagens personalizadas.
 *
 * @param {string} date - A data a ser validada.
 * @param {number} length - O comprimento mínimo necessário.
 * @param {string} requiredMessage - A mensagem de erro caso a data não seja fornecida.
 * @param {string} lengthMessage - A mensagem de erro caso a data seja menor que o comprimento mínimo.
 * @throws {Error} Se a data não for fornecida.
 * @throws {Error} Se a data tiver menos caracteres que o comprimento mínimo.
 */
export function validateDate(
	date: string,
	length: number,
	requiredMessage: string,
	lengthMessage: string
) {
	const regex = /^\d{2}[\/-]\d{2}[\/-]\d{4}$/;
	if (!date) throw new InformationError(requiredMessage);
	if (date.length < length) throw new InformationError(lengthMessage);
	if (!regex.test(date)) throw new InformationError('Invalid date format');
}
