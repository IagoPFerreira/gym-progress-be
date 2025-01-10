import { Controller } from '../../controllers';
import { ExerciseRelatedEntity } from '../../entities';
import { Service } from '../../services';
import { Repository } from '../../repositories';
import { Muscle } from '../../models';

export const repository = new Repository(Muscle);
export const service = new Service(repository, ExerciseRelatedEntity);
export const controller = new Controller(service);
