import * as sinon from 'sinon';
import { Model } from 'mongoose';
import ExerciseAggregate from '../../src/models/ExerciseAggregate';
import { criadoModelSupino, supino } from '../dummies/exercises';
import Equipment from '../../src/entities/Equipment';
import Exercise from '../../src/entities/Exercise';
import MuscleGroup from '../../src/entities/MuscleGroup';
import Serie from '../../src/entities/Serie';

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
	});

	describe('Failure cases', () => {
		describe('When creating a exercise aggregated', () => {
			it('should return a error', async () => {
				const exerciseAggregate = new ExerciseAggregate();
				// @ts-ignore
				const promise = exerciseAggregate.create({});

				return expect(promise).rejects.toThrow();
			});
		});
	});
});
