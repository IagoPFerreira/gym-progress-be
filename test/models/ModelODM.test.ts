import * as sinon from 'sinon';
import { Model } from 'mongoose';
import ExerciseAggregateModel from '../../src/models/ExerciseAggregate.model';
import {
	atualizadoModelSupino,
	criadoModelSupino,
	supino,
	todosExerciciosModel,
} from '../dummies/exercises';
import EquipmentEntity from '../../src/entities/Equipment.entity';
import ExerciseEntity from '../../src/entities/Exercise.entity';
import MuscleGroupEntity from '../../src/entities/MuscleGroup.entity';
import SerieEntity from '../../src/entities/Serie.entity';

describe('Exercise Aggregate Model', () => {
	describe('Success cases', () => {
		const exercise = new ExerciseEntity(supino.exercise);
		const series = supino.series.map((serie) => new SerieEntity(serie));
		const equipment = new EquipmentEntity(supino.equipment);
		const muscleGroup = new MuscleGroupEntity(supino.muscleGroup);
		const { type, date, trainingDay, observation } = supino;
		const exerciseAggregate = new ExerciseAggregateModel();

		beforeAll(async () => {
			sinon.stub(Model, 'create').resolves([criadoModelSupino]);
			sinon.stub(Model, 'find').resolves(todosExerciciosModel);
			sinon.stub(Model, 'findOne').resolves(criadoModelSupino);
			sinon.stub(Model, 'findOneAndUpdate').resolves(atualizadoModelSupino);
			sinon.stub(Model, 'findByIdAndDelete').resolves(criadoModelSupino);
		});

		afterAll(() => {
			sinon.restore();
		});

		describe('When creating a exercise aggregated', () => {
			it('should return a object with all infos', async () => {
				const newExercise = await exerciseAggregate.create({
					exercise,
					series,
					equipment,
					muscleGroup,
					type,
					date,
					trainingDay,
					observation,
				});
				expect(newExercise).toMatchObject(criadoModelSupino);
			});
		});

		describe('When getting all exercises aggregated', () => {
			it('should return a array with all exercises', async () => {
				const allExercises = await exerciseAggregate.read();
				expect(allExercises).toMatchObject(todosExerciciosModel);
			});
		});

		describe('When getting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const exercise = await exerciseAggregate.readOne(criadoModelSupino._id);
				expect(exercise).toMatchObject(criadoModelSupino);
			});
		});

		describe('When updating an exercise aggregated by id', () => {
			it('should return a object with all new infos', async () => {
				const updateSeries = atualizadoModelSupino.series.map(
					(serie) => new SerieEntity(serie)
				);
				const exerciseAggregated = await exerciseAggregate.update(
					criadoModelSupino._id,
					{
						exercise,
						series: updateSeries,
						equipment,
						muscleGroup,
						type,
						date,
						trainingDay,
						observation,
					}
				);
				expect(exerciseAggregated).toMatchObject(atualizadoModelSupino);
			});
		});

		describe('When deleting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const deletedExercise = await exerciseAggregate.delete(
					criadoModelSupino._id
				);
				expect(deletedExercise).toMatchObject(criadoModelSupino);
			});
		});
	});

	describe('Failure cases', () => {
		const exerciseAggregate = new ExerciseAggregateModel();
		describe('When creating a exercise aggregated', () => {
			it('should return a error', async () => {
				try {
					// @ts-ignore
					await exerciseAggregate.create({});
				} catch (error: any) {
					expect(error.message).toBe('InvalidInfo');
				}
			});
		});

		describe('When there is not any exercise aggregated', () => {
			it('should return a empty array', async () => {
				sinon.stub(Model, 'find').resolves([]);
				const allExercises = await exerciseAggregate.read();
				expect(allExercises).toMatchObject([]);
				sinon.restore();
			});
		});

		describe('When exercise aggregated id is invalid', () => {
			it('should return a "InvalidMongoId" error', async () => {
				try {
					await exerciseAggregate.readOne('6321e977c705e38f871148c');
				} catch (error: any) {
					expect(error.message).toBe('InvalidMongoId');
				}
			});
		});

		describe('When updating an exercise aggregated by id', () => {
			it('should return a "InvalidMongoId" error', async () => {
				try {
					// @ts-ignore
					await exerciseAggregate.update('6321e977c705e38f871148c', {});
				} catch (error: any) {
					expect(error.message).toBe('InvalidMongoId');
				}
			});
		});

		describe('When deleting an exercise aggregated by id', () => {
			it('should return a "InvalidMongoId" error', async () => {
				try {
					await exerciseAggregate.delete('6321e977c705e38f871148c');
				} catch (error: any) {
					expect(error.message).toBe('InvalidMongoId');
				}
			});
		});
	});
});
