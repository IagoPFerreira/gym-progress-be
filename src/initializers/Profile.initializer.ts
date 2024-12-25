import { ProfileController } from '../controllers';
import { ProfileEntity } from '../entities';
import { ProfileService } from '../services';
import { ProfileRepository } from '../repositories';
import { Profile } from '../models';
import { profileSerializer } from '../serializers';

export const profileRepository = new ProfileRepository(Profile);
export const profileService = new ProfileService(
	profileRepository,
	ProfileEntity,
	profileSerializer
);
export const profileController = new ProfileController(profileService);
