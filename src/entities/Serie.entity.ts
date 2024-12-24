import InformationError from '../errors/InformationError';
import { ErrorMessages } from '../errors/catalog';
import { IRest, ISeries, IWeight } from '../interfaces/Exercise';

export default class SerieEntity {
	readonly repetitions: number;
	readonly weight: IWeight;
	readonly quantity: number;
	readonly rest: IRest;
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

	private validateRepetition(repetitions: number) {
		if (!repetitions || typeof repetitions !== 'number')
			throw new InformationError(ErrorMessages.InvalidRepetitions);
	}

	private validateWeight(weight: {
		value: number;
		unit: string;
		distribution: string;
	}) {
		if (!weight) throw new InformationError(ErrorMessages.InvalidWeight);
		if (!weight.value || typeof weight.value !== 'number')
			throw new InformationError(ErrorMessages.InvalidWeight);
		if (!weight.unit || typeof weight.unit !== 'string')
			throw new InformationError(ErrorMessages.InvalidWeight);
		if (!weight.distribution || typeof weight.distribution !== 'string')
			throw new InformationError(ErrorMessages.InvalidWeight);
	}

	private validateQuantity(quantity: number) {
		if (!quantity || typeof quantity !== 'number')
			throw new InformationError(ErrorMessages.InvalidQuantity);
	}

	private validateRest(rest: { value: number; unit: string }) {
		if (!rest) throw new InformationError(ErrorMessages.InvalidRest);
		if (!rest.value || typeof rest.value !== 'number')
			throw new InformationError(ErrorMessages.InvalidRest);
		if (!rest.unit || typeof rest.unit !== 'string')
			throw new InformationError(ErrorMessages.InvalidRest);
	}
}
