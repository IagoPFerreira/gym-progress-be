export default class CustomError extends Error {
	public status: number;
	public message: string;
	public name: string;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
		this.message = message;
		this.name = this.constructor.name;
	}
}
