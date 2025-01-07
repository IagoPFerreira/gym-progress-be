import { router } from '../Router';
import { Accessory } from '../../initializers';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';

router
	.route('/accessory')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) => Accessory.controller.read(req, res)
	)
	.post((req, res) => Accessory.controller.create(req, res));

router
	.route('/accessory/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) =>
			Accessory.controller.readOne(req, res, [adminRole, moderatorRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			Accessory.controller.update(req, res, [adminRole, moderatorRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			Accessory.controller.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
