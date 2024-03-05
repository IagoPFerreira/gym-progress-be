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

	describe('Failure cases', () => {
		describe('When using the class', () => {
			it('should not be able of instantiate without name', () => {
				const exercise = { ...supino, name: undefined };
				// @ts-ignore
				expect(() => new Exercise(exercise)).toThrow('Invalid name');
			});

			it('should not be able of instantiate without name as string', () => {
				const exercise = { ...supino, name: 1 };
				// @ts-ignore
				expect(() => new Exercise(exercise)).toThrow('Invalid name');
			});
		});
	});
});
