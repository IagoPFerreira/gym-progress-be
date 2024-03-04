import Exercise from '../../src/entities/Exercise';

describe('Exercise', () => {
	describe('Success cases', () => {
		it('should be able of instantiate Exercise class ', () => {
			const exercise = new Exercise();
			expect(exercise).toBeDefined();
		});
	});
});
