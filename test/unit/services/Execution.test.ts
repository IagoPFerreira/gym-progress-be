import sinon from 'sinon';
import ExecutionModel from '../../../src/models/Execution.model';
import {
	benchPressExerciseToCreate,
	allExercisesService,
	benchPressExerciseCreated,
	curlExerciseToUpdate,
	curlExerciseCreated,
} from '../../dummies/instancedExercises';
import ExecutionService from '../../../src/services/Execution.service';
import ExecutionEntity from '../../../src/entities/Execution.entity';

describe('Exercise Aggregate Service', () => {
	const executionModel = new ExecutionModel();
	const executionService = new ExecutionService(
		executionModel,
		ExecutionEntity
	);
	describe('Success cases', () => {
		beforeAll(async () => {
			sinon.stub(executionModel, 'create').resolves(benchPressExerciseCreated);
			sinon.stub(executionModel, 'read').resolves(allExercisesService);
			sinon.stub(executionModel, 'readOne').resolves(curlExerciseCreated);
			sinon.stub(executionModel, 'update').resolves(curlExerciseToUpdate);
			sinon.stub(executionModel, 'delete').resolves(benchPressExerciseToCreate);
		});

		afterAll(() => {
			sinon.restore();
		});

		describe('When creating a exercise aggregated', () => {
			it('should return a object with all infos', async () => {
				const newExercise = await executionService.create(
					benchPressExerciseToCreate
				);
				expect(newExercise).toMatchObject(benchPressExerciseCreated);
			});
		});

		describe('When getting all exercises aggregated', () => {
			it('should return a array with all exercises', async () => {
				const allExercises = await executionService.read();
				expect(allExercises).toMatchObject(allExercisesService);
			});
		});

		describe('When getting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const exercise = await executionService.readOne(
					curlExerciseCreated._id
				);
				expect(exercise).toMatchObject(curlExerciseCreated);
			});
		});

		describe('When updating an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const exercise = await executionService.update(
					curlExerciseToUpdate._id,
					curlExerciseToUpdate
				);
				expect(exercise).toMatchObject(curlExerciseToUpdate);
			});
		});

		describe('When deleting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const exercise = await executionService.delete(
					benchPressExerciseCreated._id
				);
				expect(exercise).toMatchObject(benchPressExerciseToCreate);
			});
		});
	});

	describe('Failure cases', () => {
		beforeAll(async () => {
			// @ts-ignore
			sinon.stub(executionModel, 'read').resolves(null);
			sinon.stub(executionModel, 'readOne').resolves(null);
			sinon.stub(executionModel, 'update').resolves(null);
			sinon.stub(executionModel, 'delete').resolves(null);
		});

		afterAll(() => {
			sinon.restore();
		});

		describe('When trying to get all exercises aggregated and receiving null', () => {
			it('should return an error', async () => {
				expect(() => executionService.read()).rejects.toThrow('ObjectNotFound');
			});
		});

		describe('When getting an exercise aggregated by id', () => {
			it('should return a null object', async () => {
				expect(() =>
					executionService.readOne(curlExerciseCreated._id)
				).rejects.toThrow('ObjectNotFound');
			});
		});

		describe('When updating an exercise aggregated by id', () => {
			it('should return a null object', async () => {
				expect(() =>
					executionService.update(
						curlExerciseToUpdate._id,
						curlExerciseToUpdate
					)
				).rejects.toThrow('ObjectNotFound');
			});
		});

		describe('When deleting an exercise aggregated by id', () => {
			it('should return a null object', async () => {
				expect(() =>
					executionService.delete(benchPressExerciseCreated._id)
				).rejects.toThrow('ObjectNotFound');
			});
		});
	});
});
