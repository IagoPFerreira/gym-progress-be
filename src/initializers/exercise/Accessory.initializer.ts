import { Controller } from '../../controllers';
import { ExerciseRelatedEntity } from '../../entities';
import { Service } from '../../services';
import { Repository } from '../../repositories';
import { Accessory } from '../../models';
import { accessorySerializer } from '../../serializers/exercise';

export const repository = new Repository(Accessory);
export const service = new Service(
	repository,
	ExerciseRelatedEntity,
	accessorySerializer
);
export const controller = new Controller(service);
