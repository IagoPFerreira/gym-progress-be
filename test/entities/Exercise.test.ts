import ExerciseEntity from '../../src/entities/Exercise.entity';
import { supino } from '../dummies/exercises';

describe('Exercise', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const exercise = new ExerciseEntity(supino.exercise);
				expect(exercise).toBeDefined();
			});

			it('should be able of access exercise infos', () => {
				const exercise = new ExerciseEntity(supino.exercise);
				expect(exercise.name).toBe('supino');
			});
		});
	});

	describe('Failure cases', () => {
		describe('When using the class', () => {
			it('should not be able of instantiate without name', () => {
				// @ts-ignore
				expect(() => new ExerciseEntity(undefined)).toThrow(
					'Invalid exercise name'
				);
			});

			it('should not be able of instantiate without name as string', () => {
				// @ts-ignore
				expect(() => new ExerciseEntity(1)).toThrow('Invalid exercise name');
			});

			it('should not be able of instantiate without exercise', () => {
				// @ts-ignore
				expect(() => new ExerciseEntity()).toThrow('Invalid exercise name');
			});

			it('should not be able of instantiate with name as empty string', () => {
				// @ts-ignore
				expect(() => new ExerciseEntity('')).toThrow('Invalid exercise name');
			});
		});
	});
});
