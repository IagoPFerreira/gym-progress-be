import EquipmentEntity from '../../../src/entities/Equipment.entity';
import ExecutionEntity from '../../../src/entities/Execution.entity';
import MuscleGroupEntity from '../../../src/entities/MuscleGroup.entity';
import SerieEntity from '../../../src/entities/Serie.entity';
import { roscaDireta, supino } from '../../dummies/exercises';

describe('Execution', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			let execution: ExecutionEntity;
			const testeDate = new Date();

			beforeAll(() => {
				const series = supino.series.map((serie) => new SerieEntity(serie));
				const equipment = new EquipmentEntity(supino.equipment);
				const muscleGroup = new MuscleGroupEntity(supino.muscleGroup);
				const { exercise, type, date, trainingDay, observation } = supino;
				execution = new ExecutionEntity({
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
				expect(execution).toBeDefined();
			});

			it('should be able of access exercise infos', () => {
				expect(execution.exercise).toBe('supino');
			});

			it('should be able of access series', () => {
				expect(execution.series).toMatchObject([
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
				expect(execution.equipment.name).toBe('barra');
			});

			it('should be able of access muscleGroup', () => {
				expect(execution.muscleGroup.name).toBe('peitoral');
			});

			it('should be able of access type', () => {
				expect(execution.type).toBe('força');
			});

			it('should be able of access date', () => {
				expect(execution.date).toBe('06/03/2024');
			});

			it('should be able of access trainingDay', () => {
				expect(execution.trainingDay).toBe(1);
			});

			it('should be able of access observation', () => {
				expect(execution.observation).toBe('nenhuma');
			});
		});
	});

	describe('Failure cases', () => {
		describe('When using the class', () => {
			const series = roscaDireta.series.map((serie) => new SerieEntity(serie));
			const equipment = new EquipmentEntity(roscaDireta.equipment);
			const muscleGroup = new MuscleGroupEntity(roscaDireta.muscleGroup);
			const { exercise, type, date, trainingDay, observation } = roscaDireta;
			it('should not be able of instantiate without type', () => {
				expect(
					() =>
						// @ts-ignore
						new ExecutionEntity({
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
						new ExecutionEntity({
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
						new ExecutionEntity({
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
						new ExecutionEntity({
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
