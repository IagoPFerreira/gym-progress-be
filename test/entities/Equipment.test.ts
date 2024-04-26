import Equipment from '../../src/entities/Equipment';
import { supino } from '../dummies/exercises';

describe('Equipment', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const equipment = new Equipment(supino.equipment);
				expect(equipment).toBeDefined();
			});

			it('should be able of access Equipment infos', () => {
				const equipment = new Equipment(supino.equipment);
				expect(equipment.name).toBe('barra');
			});
		});
	});

	describe('Failure cases', () => {
		describe('When using the class', () => {
			it('should not be able of instantiate without name', () => {
				// @ts-ignore
				expect(() => new Equipment(undefined)).toThrow('Invalid name');
			});

			it('should not be able of instantiate without name as string', () => {
				// @ts-ignore
				expect(() => new Equipment(1)).toThrow('Invalid name');
			});

			it('should not be able of instantiate without Equipment', () => {
				// @ts-ignore
				expect(() => new Equipment()).toThrow('Invalid name');
			});

			it('should not be able of instantiate with name as empty string', () => {
				// @ts-ignore
				expect(() => new Equipment('')).toThrow('Invalid name');
			});
		});
	});
});
