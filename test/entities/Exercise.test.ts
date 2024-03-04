import Exercise from '../../src/entities/Exercise';
import { benchPress } from './dummies/exercises';

describe('Exercise', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const exercise = new Exercise(benchPress);
				expect(exercise).toBeDefined();
			});

			it('should be able of access exercise infos', () => {
				const exercise = new Exercise(benchPress);
				expect(exercise.name).toBe('supino');
				expect(exercise.equipment).toBe('barbell');
				expect(exercise.type).toBe('strength');
				expect(exercise.muscleGroup).toBe('chest');
				expect(exercise.date).toBeInstanceOf(Date);
				expect(exercise.trainingDay).toBe(1);
				expect(exercise.observations).toBe('none');
			});
		});
	});
});
