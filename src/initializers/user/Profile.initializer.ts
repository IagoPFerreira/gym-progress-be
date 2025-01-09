import { Controller } from '../../controllers';
import { ProfileEntity } from '../../entities';
import { ProfileService } from '../../services';
import { ProfileRepository } from '../../repositories';
import { Profile } from '../../models';
import { profileSerializer } from '../../serializers';

export const repository = new ProfileRepository(Profile);
export const service = new ProfileService(
	repository,
	ProfileEntity,
	profileSerializer
);
export const controller = new Controller(service);
