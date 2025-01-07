import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';
import { router } from '../Router';
import { Profile } from '../../initializers';

router
	.route('/profile')
	.get((req, res) => Profile.controller.read(req, res))
	.post((req, res) => Profile.controller.create(req, res));

router
	.route('/profile/:id')
	.get((req, res) =>
		Profile.controller.readOne(req, res, [adminRole, moderatorRole])
	)
	.put((req, res) =>
		Profile.controller.update(req, res, [adminRole, moderatorRole])
	)
	.delete((req, res) =>
		Profile.controller.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
