import { profileController } from '../../initializers/Profile.initializer';
import { validateToken } from '../../middlewares/validateToken.middleware';
import { adminRole, moderatorRole } from '../../helpers/roles';
import { router } from '../Router';

router
	.route('/profile')
	.get((req, res) => profileController.read(req, res))
	.post((req, res) => profileController.create(req, res));

router
	.route('/profile/:id')
	.get((req, res) =>
		profileController.readOne(req, res, [adminRole, moderatorRole])
	)
	.put((req, res) =>
		profileController.update(req, res, [adminRole, moderatorRole])
	)
	.delete((req, res) =>
		profileController.delete(req, res, [adminRole, moderatorRole])
	);

export default router;
