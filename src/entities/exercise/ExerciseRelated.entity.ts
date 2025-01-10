import { ErrorMessages } from '../../errors/catalog';
import { IExerciseRelated } from '../../interfaces';
import { validateData } from '../../validators';

const {
	name: { NameLength, NameRequired },
} = ErrorMessages;

export default class ExerciseRelatedEntity {
	constructor({ name }: IExerciseRelated) {
		validateData(name, 3, NameRequired, NameLength);
	}
}
