import { Controller } from '../../controllers';
import { MuscleEntity } from '../../entities';
import { Service } from '../../services';
import { MuscleRepository } from '../../repositories';
import { Muscle } from '../../models';

export const repository = new MuscleRepository(Muscle);
export const service = new Service(repository, MuscleEntity);
export const controller = new Controller(service);
