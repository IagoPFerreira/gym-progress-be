import { AccessoryController } from '../../controllers';
import { AccessoryEntity } from '../../entities';
import { AccessoryService } from '../../services';
import { AccessoryRepository } from '../../repositories';
import { Accessory } from '../../models';

export const accessoryRepository = new AccessoryRepository(Accessory);
export const accessoryService = new AccessoryService(
	accessoryRepository,
	AccessoryEntity
);
export const accessoryController = new AccessoryController(accessoryService);
