import ExerciseAggregateController from '../../../src/controllers/ExerciseAggregate.controller';
import ExerciseAggregateEntity from '../../../src/entities/ExerciseAggregate.entity';
import ExerciseAggregateModel from '../../../src/models/ExerciseAggregate.model';
import ExerciseAggregateService from '../../../src/services/ExerciseAggregate.service';
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
	const exerciseAggregateModel = new ExerciseAggregateModel();
	const exerciseAggregateService = new ExerciseAggregateService(
		exerciseAggregateModel,
		ExerciseAggregateEntity
	);
	const exerciseAggregateController = new ExerciseAggregateController(
		exerciseAggregateService
	);

	const req = {} as Request;
	const res = {} as Response;

	describe('Success cases', () => {
		beforeAll(async () => {
			sinon
				.stub(exerciseAggregateService, 'create')
				.resolves(benchPressExerciseCreated);
			sinon
				.stub(exerciseAggregateService, 'read')
				.resolves(allExercisesService);
			sinon
				.stub(exerciseAggregateService, 'readOne')
				.resolves(curlExerciseCreated);
			sinon
				.stub(exerciseAggregateService, 'update')
				.resolves(curlExerciseToUpdate);
			sinon
				.stub(exerciseAggregateService, 'delete')
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
				await exerciseAggregateController.create(req, res);

				expect((res.status as sinon.SinonStub).calledWith(201)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(benchPressExerciseCreated)
				).toBeTruthy();
			});
		});

		describe('When getting all exercises aggregated', () => {
			it('should return a array with all exercises', async () => {
				await exerciseAggregateController.read(req, res);

				expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(allExercisesService)
				).toBeTruthy();
			});
		});

		describe('When getting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				req.params = { id: curlExerciseCreated._id };
				await exerciseAggregateController.readOne(req, res);

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
				await exerciseAggregateController.update(req, res);

				expect((res.status as sinon.SinonStub).calledWith(200)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(curlExerciseToUpdate)
				).toBeTruthy();
			});
		});

		describe('When deleting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				req.params = { id: benchPressExerciseCreated._id };
				await exerciseAggregateController.delete(req, res);

				expect((res.status as sinon.SinonStub).calledWith(204)).toBeTruthy();
				expect(
					(res.json as sinon.SinonStub).calledWith(benchPressExerciseToCreate)
				).toBeTruthy();
			});
		});
	});
});
