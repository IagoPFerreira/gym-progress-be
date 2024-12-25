import { Request } from 'express';

export interface ReqUser {
	id: string;
	role: string;
	name: string;
	email: string;
	token?: string;
}

export interface CustomRequest extends Request {
	user?: ReqUser;
}
