import Equipment from '../../src/entities/Equipment';
import Exercise from '../../src/entities/Exercise';
import ExerciseAggregate from '../../src/entities/ExerciseAggregate';
import MuscleGroup from '../../src/entities/MuscleGroup';
import Series from '../../src/entities/Series';
import { supino } from './dummies/exercises';

describe('ExerciseAggregate', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			let exerciseAggregate: ExerciseAggregate;
			const testeDate = new Date();
			console.log(testeDate.toLocaleDateString('pt-BR'));

			beforeAll(() => {
				const exercise = new Exercise(supino.name);
				const series = new Series(supino.series);
				const equipment = new Equipment(supino.equipment);
				const muscleGroup = new MuscleGroup(supino.muscleGroup);
				const { type, date, trainingDay, observation } = supino;
				exerciseAggregate = new ExerciseAggregate({
					name: exercise.name,
					series,
					equipment: equipment.name,
					muscleGroup: muscleGroup.name,
					type,
					date,
					trainingDay,
					observation,
				});
			});
			it('should be able of instantiate', () => {
				expect(exerciseAggregate).toBeDefined();
			});

			it('should be able of access exercise infos', () => {
				expect(exerciseAggregate.name).toBe('supino');
			});

			it('should be able of access series', () => {
				expect(exerciseAggregate.series).toMatchObject({
					repetitions: 10,
					weight: {
						value: 20,
						unit: 'kg',
						distribution: 'cada lado',
					},
					quantity: 4,
					rest: {
						value: 1,
						unit: 'min',
					},
				});
			});

			it('should be able of access equipment', () => {
				expect(exerciseAggregate.equipment).toBe('barra');
			});

			it('should be able of access muscleGroup', () => {
				expect(exerciseAggregate.muscleGroup).toBe('peitoral');
			});

			it('should be able of access type', () => {
				expect(exerciseAggregate.type).toBe('força');
			});

			it('should be able of access date', () => {
				expect(exerciseAggregate.date).toBe('06/03/2024');
			});

			it('should be able of access trainingDay', () => {
				expect(exerciseAggregate.trainingDay).toBe(1);
			});

			it('should be able of access observation', () => {
				expect(exerciseAggregate.observation).toBe('nenhuma');
			});
		});
	});
});
