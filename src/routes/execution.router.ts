import { Router } from 'express';
import ExecutionModel from '../models/Execution.model';
import ExecutionService from '../services/Execution.service';
import ExecutionController from '../controllers/Execution.controller';
import ExecutionEntity from '../entities/Execution.entity';

const router = Router();

const executionModel = new ExecutionModel();
const executionService = new ExecutionService(executionModel, ExecutionEntity);
const executionController = new ExecutionController(executionService);

router
	.route('/execution')
	.get((req, res) => executionController.read(req, res))
	.post((req, res) => executionController.create(req, res));

router
	.route('/execution/:id')
	.get((req, res) => executionController.readOne(req, res))
	.put((req, res) => executionController.update(req, res))
	.delete((req, res) => executionController.delete(req, res));

export default router;
