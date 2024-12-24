import { ErrorResponseObject } from '../errors/catalog';

export interface IService<T> {
	create(obj: T): Promise<T | null | ErrorResponseObject>;
	read(): Promise<T[] | ErrorResponseObject>;
	readOne(
		_id: string,
		doesExistCall?: boolean
	): Promise<T | null | ErrorResponseObject>;
	update(id: string, obj: T): Promise<T | ErrorResponseObject>;
	delete(id: string): Promise<T | ErrorResponseObject>;
}
