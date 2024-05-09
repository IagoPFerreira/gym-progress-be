import MuscleGroupEntity from '../../../src/entities/MuscleGroup.entity';
import { supino } from '../../dummies/exercises';

describe('MuscleGroup', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const muscleGroup = new MuscleGroupEntity(supino.muscleGroup);
				expect(muscleGroup).toBeDefined();
			});

			it('should be able of access MuscleGroup infos', () => {
				const muscleGroup = new MuscleGroupEntity(supino.muscleGroup);
				expect(muscleGroup.name).toBe('peitoral');
			});
		});
	});

	describe('Failure cases', () => {
		describe('When using the class', () => {
			it('should not be able of instantiate without name', () => {
				// @ts-ignore
				expect(() => new MuscleGroupEntity(undefined)).toThrow(
					'Invalid muscle group name'
				);
			});

			it('should not be able of instantiate without name as string', () => {
				// @ts-ignore
				expect(() => new MuscleGroupEntity(1)).toThrow(
					'Invalid muscle group name'
				);
			});

			it('should not be able of instantiate without MuscleGroup', () => {
				// @ts-ignore
				expect(() => new MuscleGroupEntity()).toThrow(
					'Invalid muscle group name'
				);
			});

			it('should not be able of instantiate with name as empty string', () => {
				// @ts-ignore
				expect(() => new MuscleGroupEntity('')).toThrow(
					'Invalid muscle group name'
				);
			});
		});
	});
});
