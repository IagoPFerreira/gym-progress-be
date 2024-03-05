import MuscleGroup from '../../src/entities/MuscleGroup';
import { supino } from './dummies/exercises';

describe('MuscleGroup', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const muscleGroup = new MuscleGroup(supino.muscleGroup);
				expect(muscleGroup).toBeDefined();
			});

			it('should be able of access MuscleGroup infos', () => {
				const muscleGroup = new MuscleGroup(supino.muscleGroup);
				expect(muscleGroup.name).toBe('peitoral');
			});
		});
	});

	describe('Failure cases', () => {
		describe('When using the class', () => {
			it('should not be able of instantiate without name', () => {
				// @ts-ignore
				expect(() => new MuscleGroup(undefined)).toThrow('Invalid name');
			});

			it('should not be able of instantiate without name as string', () => {
				// @ts-ignore
				expect(() => new MuscleGroup(1)).toThrow('Invalid name');
			});

			it('should not be able of instantiate without MuscleGroup', () => {
				// @ts-ignore
				expect(() => new MuscleGroup()).toThrow('Invalid name');
			});

			it('should not be able of instantiate with name as empty string', () => {
				// @ts-ignore
				expect(() => new MuscleGroup('')).toThrow('Invalid name');
			});
		});
	});
});
