import { Machine } from '../../models';
import { Controller } from '../../controllers';
import { ExerciseRelatedEntity } from '../../entities';
import { Repository } from '../../repositories';
import { Service } from '../../services';
import { machineSerializer } from '../../serializers/exercise';

export const repository = new Repository(Machine);
export const service = new Service(
	repository,
	ExerciseRelatedEntity,
	machineSerializer
);
export const controller = new Controller(service);
