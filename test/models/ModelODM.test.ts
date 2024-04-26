import * as sinon from 'sinon';
import { Model } from 'mongoose';
import ExerciseAggregate from '../../src/models/ExerciseAggregate';
import {
	atualizadoModelSupino,
	criadoModelSupino,
	supino,
	todosExerciciosModel,
} from '../dummies/exercises';
import Equipment from '../../src/entities/Equipment';
import Exercise from '../../src/entities/Exercise';
import MuscleGroup from '../../src/entities/MuscleGroup';
import Serie from '../../src/entities/Serie';

describe('Exercise Aggregate Model', () => {
	describe('Success cases', () => {
		const exercise = new Exercise(supino.exercise);
		const series = supino.series.map((serie) => new Serie(serie));
		const equipment = new Equipment(supino.equipment);
		const muscleGroup = new MuscleGroup(supino.muscleGroup);
		const { type, date, trainingDay, observation } = supino;
		const exerciseAggregate = new ExerciseAggregate();

		beforeAll(async () => {
			sinon.stub(Model, 'create').resolves([criadoModelSupino]);
			sinon.stub(Model, 'find').resolves(todosExerciciosModel);
			sinon.stub(Model, 'findOne').resolves(criadoModelSupino);
			sinon.stub(Model, 'findOneAndUpdate').resolves(atualizadoModelSupino);
			// sinon.stub(Model, 'findByIdAndDelete').resolves(createdCar);
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
					(serie) => new Serie(serie)
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
	});

	describe('Failure cases', () => {
		const exerciseAggregate = new ExerciseAggregate();
		describe('When creating a exercise aggregated', () => {
			it('should return a error', async () => {
				try {
					// @ts-ignore
					await exerciseAggregate.create({});
				} catch (error: any) {
					console.log(error.message);
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
					console.log(error.message);
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
					console.log(error.message);
					expect(error.message).toBe('InvalidMongoId');
				}
			});
		});
	});
});
