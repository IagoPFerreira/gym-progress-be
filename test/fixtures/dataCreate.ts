import { Accessory, Machine, Profile } from '../../src/models';
import {
	AccessoryToCreate,
	MachineToCreate,
	ProfileToCreate,
} from './dataCreate.types';

export const createAccessory = async (accessoryToCreate: AccessoryToCreate) =>
	Accessory.create(accessoryToCreate);

export const createMachine = async (analysisFilesToCreate: MachineToCreate) =>
	Machine.create(analysisFilesToCreate);

export const createProfile = async (profileToCreate: ProfileToCreate) =>
	Profile.create(profileToCreate);
