import { AccessoryController } from '../../controllers';
import { AccessoryEntity } from '../../entities';
import { AccessoryService } from '../../services';
import { AccessoryRepository } from '../../repositories';
import { Accessory } from '../../models';
import { accessorySerializer } from '../../serializers/exercise';

export const accessoryRepository = new AccessoryRepository(Accessory);
export const accessoryService = new AccessoryService(
	accessoryRepository,
	AccessoryEntity,
	accessorySerializer
);
export const accessoryController = new AccessoryController(accessoryService);
