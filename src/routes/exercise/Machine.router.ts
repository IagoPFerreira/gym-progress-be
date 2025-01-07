import { router } from '../Router';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';
import { Machine } from '../../initializers';

router
	.route('/machine')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) => Machine.controller.read(req, res)
	)
	.post((req, res) => Machine.controller.create(req, res));

router
	.route('/machine/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) =>
			Machine.controller.readOne(req, res, [adminRole, moderatorRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			Machine.controller.update(req, res, [adminRole, moderatorRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			Machine.controller.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
