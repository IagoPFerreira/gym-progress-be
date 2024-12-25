import { IService } from './Generics.interface';

export interface IProfile {
	name: string;
	email: string;
	password: string;
	role?: string;
}

export interface IProfileReturn extends IProfile {
	id?: number;
	role: string;
}

export interface IProfileService extends IService {
	findByEmail(email: string): Promise<IProfileReturn>;
}
