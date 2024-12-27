import { Machine, Profile } from '../../src/models';
import { MachineToCreate, ProfileToCreate } from './dataCreate.types';

export const createMachine = async (analysisFilesToCreate: MachineToCreate) =>
	Machine.create(analysisFilesToCreate);

export const createProfile = async (profileToCreate: ProfileToCreate) =>
	Profile.create(profileToCreate);
