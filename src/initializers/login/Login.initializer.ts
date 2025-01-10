import { LoginController } from '../../controllers';
import { Profile } from '../../models';
import { Repository } from '../../repositories';
import { LoginService } from '../../services';

export const repository = new Repository(Profile);
export const service = new LoginService(repository);
export const controller = new LoginController(service);
