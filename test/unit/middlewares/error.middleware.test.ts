import InformationError from '../../../src/errors/InformationError';
import { ErrorTypes } from '../../../src/errors/catalog';
import ErrorHandler from '../../../src/middlewares/error.middleware';

describe('Error Middleware', () => {
	const res = {
		status: jest.fn(() => res),
		json: jest.fn(() => res),
	} as any;
	const next = jest.fn();
	const error = new Error('internal error');

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a object with the default message error', () => {
		const error = new Error('error message');
		// @ts-ignore
		ErrorHandler.handle(error, null, res, next);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ error: 'internal error' });
	});

	it('should return a object with a custom message error from "InformationError"', () => {
		const error = new InformationError('error message');
		// @ts-ignore
		ErrorHandler.handle(error, null, res, next);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'error message' });
	});

	it('should return a object with a message error from ErrorTypes', () => {
		const error = new Error(ErrorTypes.ObjectNotFound);
		// @ts-ignore
		ErrorHandler.handle(error, null, res, next);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			error: 'Object not found',
		});
	});
});
