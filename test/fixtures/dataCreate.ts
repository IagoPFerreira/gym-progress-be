import { Accessory, Focus, Machine, Muscle, Profile } from '../../src/models';
import { ExerciseRelatedToCreate, ProfileToCreate } from './dataCreate.types';

export const createAccessory = async (
	accessoryToCreate: ExerciseRelatedToCreate
) => Accessory.create(accessoryToCreate);

export const createFocus = async (focusToCreate: ExerciseRelatedToCreate) =>
	Focus.create(focusToCreate);

export const createMachine = async (machineToCreate: ExerciseRelatedToCreate) =>
	Machine.create(machineToCreate);

export const createMuscle = async (muscleToCreate: ExerciseRelatedToCreate) =>
	Muscle.create(muscleToCreate);

export const createProfile = async (profileToCreate: ProfileToCreate) =>
	Profile.create(profileToCreate);
