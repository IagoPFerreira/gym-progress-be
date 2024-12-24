import EquipmentEntity from '../../../src/entities/Equipment.entity';
import { supino } from '../../dummies/exercises';

describe('Equipment', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const equipment = new EquipmentEntity(supino.equipment);
				expect(equipment).toBeDefined();
			});

			it('should be able of access Equipment infos', () => {
				const equipment = new EquipmentEntity(supino.equipment);
				expect(equipment.name).toBe('barra');
			});
		});
	});

	describe('Failure cases', () => {
		describe('When using the class', () => {
			it('should not be able of instantiate without name', () => {
				// @ts-ignore
				expect(() => new EquipmentEntity(undefined)).toThrow(
					'Invalid equipment name'
				);
			});

			it('should not be able of instantiate without name as string', () => {
				// @ts-ignore
				expect(() => new EquipmentEntity(1)).toThrow('Invalid equipment name');
			});

			it('should not be able of instantiate without Equipment', () => {
				// @ts-ignore
				expect(() => new EquipmentEntity()).toThrow('Invalid equipment name');
			});

			it('should not be able of instantiate with name as empty string', () => {
				// @ts-ignore
				expect(() => new EquipmentEntity('')).toThrow('Invalid equipment name');
			});
		});
	});
});
