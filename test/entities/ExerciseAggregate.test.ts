import Equipment from '../../src/entities/Equipment';
import Exercise from '../../src/entities/Exercise';
import ExerciseAggregate from '../../src/entities/ExerciseAggregate';
import MuscleGroup from '../../src/entities/MuscleGroup';
import Serie from '../../src/entities/Serie';
import { roscaDireta, supino } from './dummies/exercises';

describe('ExerciseAggregate', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			let exerciseAggregate: ExerciseAggregate;
			const testeDate = new Date();

			beforeAll(() => {
				const exercise = new Exercise(supino.name);
				const series = supino.series.map((serie) => new Serie(serie));
				const equipment = new Equipment(supino.equipment);
				const muscleGroup = new MuscleGroup(supino.muscleGroup);
				const { type, date, trainingDay, observation } = supino;
				exerciseAggregate = new ExerciseAggregate({
					exercise,
					series,
					equipment,
					muscleGroup,
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
				expect(exerciseAggregate.exercise).toBe('supino');
			});

			it('should be able of access series', () => {
				expect(exerciseAggregate.series).toMatchObject([
					{
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
					},
				]);
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

	describe('Failure cases', () => {
		describe('When using the class', () => {
			const exercise = new Exercise(roscaDireta.name);
			const series = roscaDireta.series.map((serie) => new Serie(serie));
			const equipment = new Equipment(roscaDireta.equipment);
			const muscleGroup = new MuscleGroup(roscaDireta.muscleGroup);
			const { type, date, trainingDay, observation } = roscaDireta;
			it('should not be able of instantiate without type', () => {
				expect(
					() =>
						// @ts-ignore
						new ExerciseAggregate({
							exercise,
							series,
							equipment,
							muscleGroup,
							date,
							trainingDay,
							observation,
						})
				).toThrow('Invalid type');
			});

			it('should not be able of instantiate without date', () => {
				expect(
					() =>
						// @ts-ignore
						new ExerciseAggregate({
							exercise,
							series,
							equipment,
							muscleGroup,
							type,
							trainingDay,
							observation,
						})
				).toThrow('Invalid date');
			});

			it('should not be able of instantiate without trainingDay', () => {
				expect(
					() =>
						// @ts-ignore
						new ExerciseAggregate({
							exercise,
							series,
							equipment,
							muscleGroup,
							type,
							date,
							observation,
						})
				).toThrow('Invalid training day');
			});

			it('should not be able of instantiate with a observation there is not a string', () => {
				expect(
					() =>
						// @ts-ignore
						new ExerciseAggregate({
							exercise,
							series,
							equipment,
							muscleGroup,
							type,
							date,
							trainingDay,
							// @ts-ignore
							observation: 5,
						})
				).toThrow('Invalid observation');
			});
		});
	});
});
