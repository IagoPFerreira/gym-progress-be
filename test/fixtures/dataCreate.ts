import { Accessory, Machine, Muscle, Profile } from '../../src/models';
import {
	AccessoryToCreate,
	MachineToCreate,
	MuscleToCreate,
	ProfileToCreate,
} from './dataCreate.types';

export const createAccessory = async (accessoryToCreate: AccessoryToCreate) =>
	Accessory.create(accessoryToCreate);

export const createMachine = async (analysisFilesToCreate: MachineToCreate) =>
	Machine.create(analysisFilesToCreate);

export const createMuscle = async (analysisFilesToCreate: MuscleToCreate) =>
	Muscle.create(analysisFilesToCreate);

export const createProfile = async (profileToCreate: ProfileToCreate) =>
	Profile.create(profileToCreate);
