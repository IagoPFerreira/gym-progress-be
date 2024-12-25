export interface ILogin {
	email: string;
	password: string;
}

export interface ILoginReturn {
	id: number;
	name: string;
	email: string;
	role: string;
	token: string;
}
