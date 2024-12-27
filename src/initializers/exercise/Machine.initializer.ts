import { Machine } from '../../models';
import { MachineController } from '../../controllers';
import { MachineEntity } from '../../entities';
import { MachineRepository } from '../../repositories';
import { MachineService } from '../../services';

export const machineRepository = new MachineRepository(Machine);
export const machineService = new MachineService(
	machineRepository,
	MachineEntity
);
export const machineController = new MachineController(machineService);
