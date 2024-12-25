import InformationError from '../errors/Information.error';

/**
 * Valida o dado fornecido com base no comprimento e mensagens personalizadas.
 *
 * @param {string} data - O dado a ser validado.
 * @param {number} length - O comprimento mínimo necessário.
 * @param {string} requiredMessage - A mensagem de erro caso o dado não seja fornecido.
 * @param {string} lengthMessage - A mensagem de erro caso o dado seja menor que o comprimento mínimo.
 * @throws {Error} Se o dado não for fornecido.
 * @throws {Error} Se o dado tiver menos caracteres que o comprimento mínimo.
 */
export function validateData(
	data: string,
	length: number,
	requiredMessage: string,
	lengthMessage: string
) {
	if (!data) throw new InformationError(requiredMessage);
	if (data.length < length) throw new InformationError(lengthMessage);
}
