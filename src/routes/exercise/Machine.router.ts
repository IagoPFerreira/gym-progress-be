import { router } from '../Router';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';
import { machineController } from '../../initializers/exercise/Machine.initializer';

router
	.route('/machine')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) => machineController.read(req, res)
	)
	.post((req, res) => machineController.create(req, res));

router
	.route('/machine/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) =>
			machineController.readOne(req, res, [adminRole, moderatorRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) => machineController.update(req, res, [adminRole, moderatorRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) => machineController.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
