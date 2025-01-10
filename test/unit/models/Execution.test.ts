// import * as sinon from 'sinon';
// import { Model } from 'mongoose';
// import ExecutionModel from '../../../src/models/Execution.model';
// import {
// 	atualizadoModelSupino,
// 	criadoModelSupino,
// 	supino,
// 	todosExerciciosModel,
// } from '../../dummies/exercises';
// import EquipmentEntity from '../../../src/entities/Equipment.entity';
// import MuscleEntity from '../../../src/entities/Muscle.entity';
// import SerieEntity from '../../../src/entities/Serie.entity';

// describe('Exercise Aggregate Model', () => {
// 	describe('Success cases', () => {
// 		const series = supino.series.map((serie) => new SerieEntity(serie));
// 		const equipment = new EquipmentEntity(supino.equipment);
// 		const muscle = new MuscleEntity(supino.muscle);
// 		const { exercise, type, date, trainingDay, observation } = supino;
// 		const execution = new ExecutionModel();

// 		beforeAll(async () => {
// 			sinon.stub(Model, 'create').resolves([criadoModelSupino]);
// 			sinon.stub(Model, 'find').resolves(todosExerciciosModel);
// 			sinon.stub(Model, 'findOne').resolves(criadoModelSupino);
// 			sinon.stub(Model, 'findOneAndUpdate').resolves(atualizadoModelSupino);
// 			sinon.stub(Model, 'findByIdAndDelete').resolves(criadoModelSupino);
// 		});

// 		afterAll(() => {
// 			sinon.restore();
// 		});

// 		describe('When creating a exercise aggregated', () => {
// 			it('should return a object with all infos', async () => {
// 				const newExercise = await execution.create({
// 					exercise,
// 					series,
// 					equipment,
// 					muscle,
// 					type,
// 					date,
// 					trainingDay,
// 					observation,
// 				});
// 				expect(newExercise).toMatchObject(criadoModelSupino);
// 			});
// 		});

// 		describe('When getting all exercises aggregated', () => {
// 			it('should return a array with all exercises', async () => {
// 				const allExercises = await execution.read();
// 				expect(allExercises).toMatchObject(todosExerciciosModel);
// 			});
// 		});

// 		describe('When getting an exercise aggregated by id', () => {
// 			it('should return a object with all infos', async () => {
// 				const exercise = await execution.readOne(criadoModelSupino._id);
// 				expect(exercise).toMatchObject(criadoModelSupino);
// 			});
// 		});

// 		describe('When updating an exercise aggregated by id', () => {
// 			it('should return a object with all new infos', async () => {
// 				const updateSeries = atualizadoModelSupino.series.map(
// 					(serie) => new SerieEntity(serie)
// 				);
// 				const executiond = await execution.update(criadoModelSupino._id, {
// 					exercise,
// 					series: updateSeries,
// 					equipment,
// 					muscle,
// 					type,
// 					date,
// 					trainingDay,
// 					observation,
// 				});
// 				expect(executiond).toMatchObject(atualizadoModelSupino);
// 			});
// 		});

// 		describe('When deleting an exercise aggregated by id', () => {
// 			it('should return a object with all infos', async () => {
// 				const deletedExercise = await execution.delete(criadoModelSupino._id);
// 				expect(deletedExercise).toMatchObject(criadoModelSupino);
// 			});
// 		});
// 	});

// 	describe('Failure cases', () => {
// 		const execution = new ExecutionModel();
// 		describe('When creating a exercise aggregated', () => {
// 			it('should return a error', async () => {
// 				try {
// 					// @ts-ignore
// 					await execution.create({});
// 				} catch (error: any) {
// 					expect(error.message).toBe('InvalidInfo');
// 				}
// 			});
// 		});

// 		describe('When there is not any exercise aggregated', () => {
// 			it('should return a empty array', async () => {
// 				sinon.stub(Model, 'find').resolves([]);
// 				const allExercises = await execution.read();
// 				expect(allExercises).toMatchObject([]);
// 				sinon.restore();
// 			});
// 		});

// 		describe('When exercise aggregated id is invalid', () => {
// 			it('should return a "InvalidMongoId" error', async () => {
// 				try {
// 					await execution.readOne('6321e977c705e38f871148c');
// 				} catch (error: any) {
// 					expect(error.message).toBe('InvalidMongoId');
// 				}
// 			});
// 		});

// 		describe('When updating an exercise aggregated by id', () => {
// 			it('should return a "InvalidMongoId" error', async () => {
// 				try {
// 					// @ts-ignore
// 					await execution.update('6321e977c705e38f871148c', {});
// 				} catch (error: any) {
// 					expect(error.message).toBe('InvalidMongoId');
// 				}
// 			});
// 		});

// 		describe('When deleting an exercise aggregated by id', () => {
// 			it('should return a "InvalidMongoId" error', async () => {
// 				try {
// 					await execution.delete('6321e977c705e38f871148c');
// 				} catch (error: any) {
// 					expect(error.message).toBe('InvalidMongoId');
// 				}
// 			});
// 		});
// 	});
// });
