import { ISeries } from '../interfaces/Exercise';

export default class Series {
	readonly repetitions: number;
	readonly weight: {};
	readonly quantity: number;
	readonly rest: {};
	constructor(series: ISeries) {
		if (!series || Object.keys(series).length === 0)
			throw new Error('Invalid series');
		this.validateRepetition(series.repetitions);
		this.repetitions = series.repetitions;
		this.validateWeight(series.weight);
		this.weight = series.weight;
		this.validateQuantity(series.quantity);
		this.quantity = series.quantity;
		this.validateRest(series.rest);
		this.rest = series.rest;
	}

	validateRepetition(repetitions: number) {
		if (!repetitions || typeof repetitions !== 'number')
			throw new Error('Invalid repetitions');
	}

	validateWeight(weight: {
		value: number;
		unit: string;
		distribution: string;
	}) {
		if (!weight) throw new Error('Invalid weight');
		if (!weight.value || typeof weight.value !== 'number')
			throw new Error('Invalid weight');
		if (!weight.unit || typeof weight.unit !== 'string')
			throw new Error('Invalid weight');
		if (!weight.distribution || typeof weight.distribution !== 'string')
			throw new Error('Invalid weight');
	}

	validateQuantity(quantity: number) {
		if (!quantity || typeof quantity !== 'number')
			throw new Error('Invalid quantity');
	}

	validateRest(rest: { value: number; unit: string }) {
		if (!rest) throw new Error('Invalid rest');
		if (!rest.value || typeof rest.value !== 'number')
			throw new Error('Invalid rest');
		if (!rest.unit || typeof rest.unit !== 'string')
			throw new Error('Invalid rest');
	}
}
