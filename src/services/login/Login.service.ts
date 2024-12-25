import { ErrorTypes } from '../../errors/catalog';
import { generateToken } from '../../helpers/generateToken';
import { compareHash } from '../../helpers/hashPassword';
import { ILogin } from '../../interfaces/Login.interface';
import { LoginRepository } from '../../repositories';
import { validateEmail, validatePassword } from '../../validators';

export default class LoginService {
	constructor(protected repository: LoginRepository) {}

	public async login(obj: ILogin): Promise<{}> {
		validateEmail(obj.email);
		validatePassword(obj.password);
		const user = await this.repository.readBy({ email: obj.email });

		if (!user) throw new Error(ErrorTypes.ObjectNotFound);

		await compareHash(obj.password, user.password);
		// @ts-ignore
		const { password, createdAt, updatedAt, ...rest } = user;

		const token = await generateToken(rest);
		return {
			token,
			...rest,
		};
	}
}
