import { NextFunction, Request, Response } from 'express';
import { ErrorTypes, errorCatalog } from '../errors/catalog';
import InformationError from '../errors/Information.error';

class ErrorHandler {
	public static handle(
		error: Error,
		_req: Request,
		res: Response,
		_next: NextFunction
	) {
		console.log(error);

		if (error instanceof InformationError) {
			return res.status(error.status).json({ error: error.message });
		}

		const messageAsErrorType = error.message as keyof typeof ErrorTypes;

		const mappedError = errorCatalog[messageAsErrorType];

		if (mappedError) {
			const { httpStatus, message } = mappedError;
			return res.status(httpStatus).json({ error: message });
		}

		return res.status(500).json({ error: 'internal error' });
	}
}

export default ErrorHandler;
