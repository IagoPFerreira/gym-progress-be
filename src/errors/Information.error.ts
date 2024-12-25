import CustomError from './Custom.error';

export default class InformationError extends CustomError {
	constructor(message: string, status: number = 400) {
		super(message, status);
	}
}
