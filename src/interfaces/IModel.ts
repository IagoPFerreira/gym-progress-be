export interface IModel<T> {
	create(obj: T): Promise<T>;
	read(): Promise<T[]>;
	readOne(obj: string): Promise<T | null>;
	update(id: string | number, obj: T): Promise<T | null>;
	delete(id: string | number): Promise<T | null>;
}
