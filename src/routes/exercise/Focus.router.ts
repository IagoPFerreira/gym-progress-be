import { router } from '../Router';
import { Focus } from '../../initializers';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';

router
	.route('/focus')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) => Focus.controller.read(req, res)
	)
	.post((req, res) => Focus.controller.create(req, res));

router
	.route('/focus/:id')
	.get(
		(req, res, next) =>
			validateToken(req, res, next, [adminRole, moderatorRole]),
		(req, res) =>
			Focus.controller.readOne(req, res, [adminRole,	moderatorRole])
	)
	.put(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			Focus.controller.update(req, res, [adminRole, moderatorRole])
	)
	.delete(
		(req, res, next) => validateToken(req, res, next, [adminRole]),
		(req, res) =>
			Focus.controller.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
