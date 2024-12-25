import { Router } from 'express';
import { loginController } from '../../initializers/login/Login.initializer';

const router = Router();

router.route('/login').post((req, res) => loginController.login(req, res));

export default router;
