import * as sinon from 'sinon';
import { Model } from 'mongoose';
import ExerciseAggregate from '../../src/models/ExerciseAggregate';
import {
	criadoModelSupino,
	supino,
	todosExerciciosModel,
} from '../dummies/exercises';
import Equipment from '../../src/entities/Equipment';
import Exercise from '../../src/entities/Exercise';
import MuscleGroup from '../../src/entities/MuscleGroup';
import Serie from '../../src/entities/Serie';
import { ErrorTypes } from '../../src/errors/catalog';

describe('Exercise Aggregate Model', () => {
	describe('Success cases', () => {
		const exercise = new Exercise(supino.exercise);
		const series = supino.series.map((serie) => new Serie(serie));
		const equipment = new Equipment(supino.equipment);
		const muscleGroup = new MuscleGroup(supino.muscleGroup);
		const { type, date, trainingDay, observation } = supino;
		const exerciseAggregate = new ExerciseAggregate();

		beforeAll(async () => {
			sinon.stub(Model, 'create').resolves([criadoModelSupino]);
			sinon.stub(Model, 'find').resolves(todosExerciciosModel);
			sinon.stub(Model, 'findOne').resolves(criadoModelSupino);
			// sinon.stub(Model, 'findOneAndUpdate').resolves(updatedCar);
			// sinon.stub(Model, 'findByIdAndDelete').resolves(createdCar);
		});

		afterAll(() => {
			sinon.restore();
		});

		describe('When creating a exercise aggregated', () => {
			it('should return a object with all infos', async () => {
				const newExercise = await exerciseAggregate.create({
					exercise,
					series,
					equipment,
					muscleGroup,
					type,
					date,
					trainingDay,
					observation,
				});
				expect(newExercise).toMatchObject(criadoModelSupino);
			});
		});

		describe('When getting all exercises aggregated', () => {
			it('should return a array with all exercises', async () => {
				const allExercises = await exerciseAggregate.read();
				expect(allExercises).toMatchObject(todosExerciciosModel);
			});
		});

		describe('When getting an exercise aggregated by id', () => {
			it('should return a object with all infos', async () => {
				const exercise = await exerciseAggregate.readOne(criadoModelSupino._id);
				expect(exercise).toMatchObject(criadoModelSupino);
			});
		});
	});

	describe('Failure cases', () => {
		const exerciseAggregate = new ExerciseAggregate();
		describe('When creating a exercise aggregated', () => {
			it('should return a error', async () => {
				try {
					// @ts-ignore
					await exerciseAggregate.create({});
				} catch (error: any) {
					console.log(error.message);
					expect(error.message).toBe('InvalidInfo');
				}
			});
		});

		describe('When there is not any exercise aggregated', () => {
			it('should return a empty array', async () => {
				sinon.stub(Model, 'find').resolves([]);
				const allExercises = await exerciseAggregate.read();
				expect(allExercises).toMatchObject([]);
				sinon.restore();
			});
		});

		describe('When exercise aggregated id is invalid', () => {
			it('should return a "InvalidMongoId" error', async () => {
				try {
					await exerciseAggregate.readOne('6321e977c705e38f871148c');
				} catch (error: any) {
					console.log(error.message);
					expect(error.message).toBe('InvalidMongoId');
				}
			});
		});
	});

	// describe('GET /cars', () => {
	//   describe('finding all cars', () => {
	//     it('succesfully found', async () => {
	//       const foundCar = await carModel.read()
	//       expect(foundCar).to.be.deep.equal(allCars);
	//     });
	//   });
	// });

	// describe('GET /cars/:id', () => {
	//   describe('finding a car', () => {
	//     it('succesfully found', async () => {
	//       const foundCar = await carModel.readOne(createdCar._id)
	//       expect(foundCar).to.be.deep.equal(createdCar);
	//     });
	//   });

	//   describe('not finding a car', () => {
	//     it('with wrong id', async () => {
	//     const promise = carModel.readOne('123ERRADO')

	//     return expect(promise).to.eventually.be.rejectedWith(Error, ErrorTypes.InvalidMongoId);
	//     });
	//   });
	// });

	// describe('PUT /cars/:id', () => {
	//   describe('updating a car', () => {
	//     it('succesfully updated', async () => {
	//       const updateCar = await carModel.update(createdCar._id, updatedCar)
	//       expect(updateCar).to.be.deep.equal(updatedCar);
	//     });
	//   });

	//   describe('not updating a car', () => {
	//     it('with wrong id', async () => {
	//     const promise = carModel.update('123ERRADO', updatedCar)

	//     return expect(promise).to.eventually.be.rejectedWith(Error, ErrorTypes.InvalidMongoId);
	//     });
	//   });
	// });

	// describe('DELETE /cars/:id', () => {
	//   describe('deleting a car', () => {
	//     it('succesfully deleted', async () => {
	//       const deletedCar = await carModel.delete(createdCar._id)
	//       expect(deletedCar).to.be.deep.equal(createdCar);
	//     });
	//   });

	//   describe('not deleting a car', () => {
	//     it('with wrong id', async () => {
	//     const promise = carModel.delete('123ERRADO')

	//     return expect(promise).to.eventually.be.rejectedWith(Error, ErrorTypes.InvalidMongoId);
	//     });
	//   });
	// });
});
