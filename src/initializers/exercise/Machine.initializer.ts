import { Machine } from '../../models';
import { MachineController } from '../../controllers';
import { MachineEntity } from '../../entities';
import { MachineRepository } from '../../repositories';
import { MachineService } from '../../services';
import { machineSerializer } from '../../serializers/exercise';

export const repository = new MachineRepository(Machine);
export const service = new MachineService(
	repository,
	MachineEntity,
	machineSerializer
);
export const controller = new MachineController(service);
