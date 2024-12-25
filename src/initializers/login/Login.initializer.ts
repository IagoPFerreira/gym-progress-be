import { LoginController } from '../../controllers';
import { Profile } from '../../models';
import { LoginRepository } from '../../repositories';
import { LoginService } from '../../services';

export const loginRepository = new LoginRepository(Profile);
export const loginService = new LoginService(loginRepository);
export const loginController = new LoginController(loginService);
