import { Router } from 'express';
import { Login } from '../../initializers';

const router = Router();

router.route('/login').post((req, res) => Login.controller.login(req, res));

export default router;
