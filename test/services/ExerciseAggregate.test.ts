import sinon from 'sinon';
import ExerciseAggregateModel from '../../src/models/ExerciseAggregate.model';
import {
	benchPressExerciseToCreate,
	allExercisesService,
	benchPressExerciseCreated,
	curlExerciseToUpdate,
	curlExerciseCreated,
} from '../dummies/instancedExercises';
import ExerciseAggregateService from '../../src/services/ExerciseAggregate.service';
import ExerciseAggregateEntity from '../../src/entities/ExerciseAggregate.entity';
import { IExerciseAggregate } from '../../src/interfaces/Exercise';

describe('Exercise Aggregate Service', () => {
	describe('Success cases', () => {
		const exerciseAggregateModel = new ExerciseAggregateModel();
		const exerciseAggregateService = new ExerciseAggregateService(
			exerciseAggregateModel,
			ExerciseAggregateEntity
		);

		beforeAll(async () => {
			sinon
				.stub(exerciseAggregateModel, 'create')
				.resolves(benchPressExerciseCreated);
			sinon.stub(exerciseAggregateModel, 'read').resolves(allExercisesService);
			sinon
				.stub(exerciseAggregateModel, 'readOne')
				.resolves(curlExerciseCreated);
			sinon
				.stub(exerciseAggregateModel, 'update')
				.resolves(curlExerciseToUpdate);
			sinon
				.stub(exerciseAggregateModel, 'delete')
				.resolves(benchPressExerciseToCreate);
		});

		afterAll(() => {
			sinon.restore();
		});

		describe('When creating a exercise aggregated', () => {
			it('should return a object with all infos', async () => {
				const newExercise = await exerciseAggregateService.create(
					benchPressExerciseToCreate
				);
				expect(newExercise).toMatchObject(benchPressExerciseCreated);
			});
		});

		describe('When getting all exercises aggregated', () => {
			it('should return a array with all exercises', async () => {
				const allExercises = await exerciseAggregateService.read();
				expect(allExercises).toMatchObject(allExercisesService);
			});
		});

		describe('When getting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const exercise = await exerciseAggregateService.readOne(
					curlExerciseCreated._id
				);
				expect(exercise).toMatchObject(curlExerciseCreated);
			});
		});

		describe('When updating an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const exercise = await exerciseAggregateService.update(
					curlExerciseToUpdate._id,
					curlExerciseToUpdate
				);
				expect(exercise).toMatchObject(curlExerciseToUpdate);
			});
		});

		describe('When deleting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const exercise = await exerciseAggregateService.delete(
					benchPressExerciseCreated._id
				);
				expect(exercise).toMatchObject(benchPressExerciseToCreate);
			});
		});
	});
	describe('Failure cases', () => {});
});
