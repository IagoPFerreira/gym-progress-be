import { LoginController } from '../../controllers';
import { Profile } from '../../models';
import { LoginRepository } from '../../repositories';
import { LoginService } from '../../services';

export const repository = new LoginRepository(Profile);
export const service = new LoginService(repository);
export const controller = new LoginController(service);
