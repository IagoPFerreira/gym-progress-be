import { Router } from 'express';
import ExerciseModel from '../models/Exercise.model';
import ExerciseService from '../services/Exercise.service';
import ExerciseController from '../controllers/Exercise.controller';
import ExerciseEntity from '../entities/Exercise.entity';

const router = Router();

const exerciseModel = new ExerciseModel();
const exerciseService = new ExerciseService(exerciseModel, ExerciseEntity);
const exerciseController = new ExerciseController(exerciseService);

router
	.route('/exercise')
	.get((req, res) => exerciseController.read(req, res))
	.post((req, res) => exerciseController.create(req, res));

router
	.route('/exercise/:id')
	.get((req, res) => exerciseController.readOne(req, res))
	.put((req, res) => exerciseController.update(req, res))
	.delete((req, res) => exerciseController.delete(req, res));

export default router;
