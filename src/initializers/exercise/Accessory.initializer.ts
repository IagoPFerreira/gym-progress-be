import { AccessoryController } from '../../controllers';
import { AccessoryEntity } from '../../entities';
import { AccessoryService } from '../../services';
import { AccessoryRepository } from '../../repositories';
import { Accessory } from '../../models';
import { accessorySerializer } from '../../serializers/exercise';

export const repository = new AccessoryRepository(Accessory);
export const service = new AccessoryService(
	repository,
	AccessoryEntity,
	accessorySerializer
);
export const controller = new AccessoryController(service);
