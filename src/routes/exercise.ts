import { Router } from 'express';
import ExerciseAggregateModel from '../models/ExerciseAggregate.model';
import ExerciseAggregateService from '../services/ExerciseAggregate.service';
import ExerciseAggregateController from '../controllers/ExerciseAggregate.controller';
import ExerciseAggregateEntity from '../entities/ExerciseAggregate.entity';

const router = Router();

const exerciseAggregateModel = new ExerciseAggregateModel();
const exerciseAggregateService = new ExerciseAggregateService(
	exerciseAggregateModel,
	ExerciseAggregateEntity
);
const exerciseAggregateController = new ExerciseAggregateController(
	exerciseAggregateService
);

router
	.route('/exerciseAggregate')
	.get((req, res) => exerciseAggregateController.read(req, res))
	.post((req, res) => exerciseAggregateController.create(req, res));

router
	.route('/exerciseAggregate/:id')
	.get((req, res) => exerciseAggregateController.readOne(req, res))
	.put((req, res) => exerciseAggregateController.update(req, res))
	.delete((req, res) => exerciseAggregateController.delete(req, res));

export default router;
