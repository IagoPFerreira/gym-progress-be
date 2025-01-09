import { Controller } from '../../controllers';
import { AccessoryEntity } from '../../entities';
import { Service } from '../../services';
import { AccessoryRepository } from '../../repositories';
import { Accessory } from '../../models';
import { accessorySerializer } from '../../serializers/exercise';

export const repository = new AccessoryRepository(Accessory);
export const service = new Service(
	repository,
	AccessoryEntity,
	accessorySerializer
);
export const controller = new Controller(service);
