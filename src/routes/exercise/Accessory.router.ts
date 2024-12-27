import { router } from '../Router';
import { accessoryController } from '../../initializers/exercise/Accessory.initializer';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';

router
	.route('/accessory')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) => accessoryController.read(req, res)
	)
	.post((req, res) => accessoryController.create(req, res));

router
	.route('/accessory/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) =>
			accessoryController.readOne(req, res, [adminRole, moderatorRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			accessoryController.update(req, res, [adminRole, moderatorRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			accessoryController.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
