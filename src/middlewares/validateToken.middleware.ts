import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import 'dotenv/config';
import InformationError from '../errors/Information.error';
import { ErrorMessages } from '../errors/catalog';
import { CustomRequest, ReqUser } from '../interfaces/CustomRequest.interface';

const secret = process.env.SECRET;

export const validateToken = (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
	roles: string[]
) => {
	const { authorization } = req.headers;

	if (!authorization)
		throw new InformationError(ErrorMessages.login.MissingAuthToken, 401);

	let token: ReqUser;

	try {
		// @ts-ignore
		token = jwt.verify(authorization, secret);
	} catch (error) {
		throw new InformationError(ErrorMessages.login.JwtMalformed, 401);
	}

	if (roles.length === 0 || !roles.includes(token.role)) {
		throw new InformationError(ErrorMessages.login.Unauthorized, 401);
	}

	req.user = token;
	next();
};
