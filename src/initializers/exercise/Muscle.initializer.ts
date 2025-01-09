import { MuscleController } from '../../controllers';
import { MuscleEntity } from '../../entities';
import { MuscleService } from '../../services';
import { MuscleRepository } from '../../repositories';
import { Muscle } from '../../models';

export const repository = new MuscleRepository(Muscle);
export const service = new MuscleService(repository, MuscleEntity);
export const controller = new MuscleController(service);
