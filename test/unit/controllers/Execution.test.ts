import ExecutionController from '../../../src/controllers/Execution.controller';
import ExecutionEntity from '../../../src/entities/Execution.entity';
import ExecutionModel from '../../../src/models/Execution.model';
import ExecutionService from '../../../src/services/Execution.service';
import sinon from 'sinon';
import {
	benchPressExerciseToCreate,
	allExercisesService,
	benchPressExerciseCreated,
	curlExerciseToUpdate,
	curlExerciseCreated,
} from '../../dummies/instancedExercises';
import { Request, Response } from 'express';

describe('Exercise Aggregate Service', () => {
	const executionModel = new ExecutionModel();
	const executionService = new ExecutionService(
		executionModel,
		ExecutionEntity
	);
	const executionController = new ExecutionController(executionService);

	const req = {} as Request;
	const res = {} as Response;

	describe('Success cases', () => {
		beforeAll(async () => {
			sinon
				.stub(executionService, 'create')
				.resolves(benchPressExerciseCreated);
			sinon.stub(executionService, 'read').resolves(allExercisesService);
			sinon.stub(executionService, 'readOne').resolves(curlExerciseCreated);
			sinon.stub(executionService, 'update').resolves(curlExerciseToUpdate);
			sinon
				.stub(executionService, 'delete')
				.resolves(benchPressExerciseToCreate);
			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns(res);
		});

		afterAll(() => {
			sinon.restore();
		});

		describe('When creating a exercise aggregated', () => {
			it('should return a object with all infos', async () => {
				req.body = benchPressExerciseToCreate;
				await executionController.create(req, res);

				expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(benchPressExerciseCreated)
				).toBeTruthy();
			});
		});

		describe('When getting all exercises aggregated', () => {
			it('should return a array with all exercises', async () => {
				await executionController.read(req, res);

				expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(allExercisesService)
				).toBeTruthy();
			});
		});

		describe('When getting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				req.params = { id: curlExerciseCreated._id };
				await executionController.readOne(req, res);

				expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(curlExerciseCreated)
				).toBeTruthy();
			});
		});

		describe('When updating an exercise aggregated by id', () => {
			it('should return a object with all new infos', async () => {
				req.params = { id: curlExerciseToUpdate._id };
				req.body = curlExerciseToUpdate;
				await executionController.update(req, res);

				expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(curlExerciseToUpdate)
				).toBeTruthy();
			});
		});

		describe('When deleting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				req.params = { id: benchPressExerciseCreated._id };
				await executionController.delete(req, res);

				expect((res.status as sinon.SinonStub).calledWith(204)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(benchPressExerciseToCreate)
				).toBeTruthy();
			});
		});
	});
});
