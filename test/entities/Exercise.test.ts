import Exercise from '../../src/entities/Exercise';
import { supino } from './dummies/exercises';

describe('Exercise', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const exercise = new Exercise(supino);
				expect(exercise).toBeDefined();
			});

			it('should be able of access exercise infos', () => {
				const exercise = new Exercise(supino);
				expect(exercise.name).toBe('supino');
			});
		});
	});
});
