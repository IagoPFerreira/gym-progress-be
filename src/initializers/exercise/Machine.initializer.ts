import { Machine } from '../../models';
import { Controller } from '../../controllers';
import { MachineEntity } from '../../entities';
import { MachineRepository } from '../../repositories';
import { Service } from '../../services';
import { machineSerializer } from '../../serializers/exercise';

export const repository = new MachineRepository(Machine);
export const service = new Service(
	repository,
	MachineEntity,
	machineSerializer
);
export const controller = new Controller(service);
