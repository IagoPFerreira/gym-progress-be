export default class InformationError extends Error {
	public status: number;
	public message: string;
	public name: string;

	constructor(message: string) {
		super(message);
		this.status = 400;
		this.message = message;
		this.name = this.constructor.name;
	}
}
