export default class Equipment {
	constructor(readonly name: string) {
		if (!name || typeof name !== 'string') throw new Error('Invalid name');
		this.name = name;
	}
}
