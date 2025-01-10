import { Controller } from '../../controllers';
import { ExerciseRelatedEntity } from '../../entities';
import { Service } from '../../services';
import { MuscleRepository } from '../../repositories';
import { Muscle } from '../../models';

export const repository = new MuscleRepository(Muscle);
export const service = new Service(repository, ExerciseRelatedEntity);
export const controller = new Controller(service);
