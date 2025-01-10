import { Controller } from '../../controllers';
import { ExerciseRelatedEntity } from '../../entities';
import { Service } from '../../services';
import { FocusRepository } from '../../repositories';
import { Focus } from '../../models';

export const repository = new FocusRepository(Focus);
export const service = new Service(repository, ExerciseRelatedEntity);
export const controller = new Controller(service);
