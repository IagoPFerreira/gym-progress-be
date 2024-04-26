export default class MuscleGroupEntity {
	constructor(readonly name: string) {
		if (!name || typeof name !== 'string') throw new Error('Invalid name');
		this.name = name;
	}
}
