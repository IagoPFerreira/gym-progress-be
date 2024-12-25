import InformationError from '../errors/Information.error';
import { ErrorMessages } from '../errors/catalog';

/**
 * Valida se o número fornecido é um número válido.
 *
 * @param {number} number - O número a ser validado.
 * @param {{ required: string, length: string, invalid: string }} messages - Um objeto contendo mensagens de erro personalizadas.
 * @throws {Error} Se o número não for fornecido.
 * @throws {Error} Se o número tiver menos de 1 caractere.
 * @throws {Error} Se o número não for um número válido.
 */
export function validateNumber(
	number: number | string,
	messages: { required: string; length: string; invalid: string }
) {
	if (number === undefined) throw new InformationError(messages.required);
	if (String(number).length < 1) throw new InformationError(messages.length);
	// adicionar um parser para converter , em .
	if (Number.isNaN(Number(String(number).replace(',', '.'))))
		throw new InformationError(messages.invalid);
}
