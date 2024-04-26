import Exercise from '../../src/entities/Exercise';
import { supino } from '../dummies/exercises';

describe('Exercise', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const exercise = new Exercise(supino.name);
				expect(exercise).toBeDefined();
			});

			it('should be able of access exercise infos', () => {
				const exercise = new Exercise(supino.name);
				expect(exercise.name).toBe('supino');
			});
		});
	});

	describe('Failure cases', () => {
		describe('When using the class', () => {
			it('should not be able of instantiate without name', () => {
				// @ts-ignore
				expect(() => new Exercise(undefined)).toThrow('Invalid name');
			});

			it('should not be able of instantiate without name as string', () => {
				// @ts-ignore
				expect(() => new Exercise(1)).toThrow('Invalid name');
			});

			it('should not be able of instantiate without exercise', () => {
				// @ts-ignore
				expect(() => new Exercise()).toThrow('Invalid name');
			});

			it('should not be able of instantiate with name as empty string', () => {
				// @ts-ignore
				expect(() => new Exercise('')).toThrow('Invalid name');
			});
		});
	});
});
