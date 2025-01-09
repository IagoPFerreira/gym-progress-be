import { router } from '../Router';
import { Muscle } from '../../initializers';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';

router
	.route('/muscle')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) => Muscle.controller.read(req, res)
	)
	.post((req, res) => Muscle.controller.create(req, res));

router
	.route('/muscle/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) =>
			Muscle.controller.readOne(req, res, [adminRole, moderatorRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) => Muscle.controller.update(req, res, [adminRole, moderatorRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) => Muscle.controller.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
