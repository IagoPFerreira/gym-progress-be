import { Request, Response } from 'express';
import LoginService from '../../services/login/Login.service';

export default class LoginController {
	constructor(protected service: LoginService) {}

	public async login(req: Request, res: Response): Promise<Response> {
		const token = await this.service.login(req.body);
		return res.status(200).json(token);
	}
}
