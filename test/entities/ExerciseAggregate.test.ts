import EquipmentEntity from '../../src/entities/Equipment.entity';
import ExerciseEntity from '../../src/entities/Exercise.entity';
import ExerciseAggregateEntity from '../../src/entities/ExerciseAggregate.entity';
import MuscleGroupEntity from '../../src/entities/MuscleGroup.entity';
import SerieEntity from '../../src/entities/Serie.entity';
import { roscaDireta, supino } from '../dummies/exercises';

describe('ExerciseAggregate', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			let exerciseAggregate: ExerciseAggregateEntity;
			const testeDate = new Date();

			beforeAll(() => {
				const exercise = new ExerciseEntity(supino.exercise);
				const series = supino.series.map((serie) => new SerieEntity(serie));
				const equipment = new EquipmentEntity(supino.equipment);
				const muscleGroup = new MuscleGroupEntity(supino.muscleGroup);
				const { type, date, trainingDay, observation } = supino;
				exerciseAggregate = new ExerciseAggregateEntity({
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
			const exercise = new ExerciseEntity(roscaDireta.exercise);
			const series = roscaDireta.series.map((serie) => new SerieEntity(serie));
			const equipment = new EquipmentEntity(roscaDireta.equipment);
			const muscleGroup = new MuscleGroupEntity(roscaDireta.muscleGroup);
			const { type, date, trainingDay, observation } = roscaDireta;
			it('should not be able of instantiate without type', () => {
				expect(
					() =>
						// @ts-ignore
						new ExerciseAggregateEntity({
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
						new ExerciseAggregateEntity({
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
						new ExerciseAggregateEntity({
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
						new ExerciseAggregateEntity({
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
