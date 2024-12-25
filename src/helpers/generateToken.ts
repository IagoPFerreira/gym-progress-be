import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.SECRET;

/**
 * Gera um token JWT com os parâmetros fornecidos.
 *
 * @param {Object} [params={}] - Os parâmetros a serem incluídos no token.
 * @returns {string} O token JWT gerado.
 */

export function generateToken(params = {}): string {
	const configJwt = { expiresIn: '1y', algorithm: 'HS256' };
	// @ts-ignore
	return jwt.sign(params, secret, configJwt);
}
