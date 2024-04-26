import Serie from '../../src/entities/Serie';
import { supino } from '../dummies/exercises';
import {
	serieWithInvalidRests,
	serieWithInvalidWeights,
	serieWithoutQuantity,
	serieWithoutRepetition,
} from '../dummies/series';

describe('Series', () => {
	describe('Success cases', () => {
		describe('When using the class', () => {
			it('should be able of instantiate', () => {
				const [series] = supino.series.map((serie) => new Serie(serie));
				expect(series).toBeDefined();
			});

			it('should be able of access series repetition', () => {
				const [series] = supino.series.map((serie) => new Serie(serie));
				expect(series.repetitions).toBe(10);
			});

			it('should be able of access series weight', () => {
				const [series] = supino.series.map((serie) => new Serie(serie));
				expect(series.weight).toMatchObject({
					value: 20,
					unit: 'kg',
					distribution: 'cada lado',
				});
			});

			it('should be able of access series quantity', () => {
				const [series] = supino.series.map((serie) => new Serie(serie));
				expect(series.quantity).toBe(4);
			});

			it('should be able of access series rest', () => {
				const [series] = supino.series.map((serie) => new Serie(serie));
				expect(series.rest).toMatchObject({
					value: 1,
					unit: 'min',
				});
			});
		});
	});

	describe('Failure cases', () => {
		describe('When using the class', () => {
			it('should not be able of instantiate without series object', () => {
				// @ts-ignore
				expect(() => new Serie()).toThrow('Invalid series');
			});

			it('should not be able of instantiate without repetitions', () => {
				// @ts-ignore
				expect(() => new Serie(serieWithoutRepetition)).toThrow(
					'Invalid repetitions'
				);
			});

			it.each(serieWithInvalidWeights)(
				'should not be able of instantiate with invalid weights',
				(serieWithInvalidWeight) => {
					// @ts-ignore
					expect(() => new Serie(serieWithInvalidWeight)).toThrow(
						'Invalid weight'
					);
				}
			);

			it('should not be able of instantiate without quantity', () => {
				// @ts-ignore
				expect(() => new Serie(serieWithoutQuantity)).toThrow(
					'Invalid quantity'
				);
			});

			it.each(serieWithInvalidRests)(
				'should not be able of instantiate with invalid rests',
				(serieWithInvalidRest) => {
					// @ts-ignore
					expect(() => new Serie(serieWithInvalidRest)).toThrow('Invalid rest');
				}
			);
		});
	});
});
