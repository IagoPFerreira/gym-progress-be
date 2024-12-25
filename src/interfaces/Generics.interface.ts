import { Request, Response } from 'express';
import { ErrorResponseObject } from '../errors/catalog';
import { CustomRequest } from './CustomRequest.interface';
import EventEmitter from 'events';
import {
	CreateOptions,
	DestroyOptions,
	Transaction,
	UpdateOptions,
} from 'sequelize';

export interface IController {
	create(req: Request, res: Response): Promise<Response>;
	read(req: Request, res: Response): Promise<Response>;
	readOne(req: Request, res: Response, canAccess: string[]): Promise<Response>;
	update(req: Request, res: Response, canAccess: string[]): Promise<Response>;
	delete(req: Request, res: Response, canAccess: string[]): Promise<Response>;
}

export interface IEvents {
	eventEmitter?: EventEmitter;
	transaction?: Transaction;
}

export interface IService {
	create(obj: any, events?: IEvents): Promise<any | null | ErrorResponseObject>;
	read(): Promise<any[] | ErrorResponseObject>;
	readOne(
		_id: string,
		canAccess: string[]
	): Promise<any | null | ErrorResponseObject>;
	readBy(where: any): Promise<any | null | ErrorResponseObject>;
	update(
		id: string,
		obj: any,
		events?: IEvents
	): Promise<any | ErrorResponseObject>;
	delete(id: string, events?: IEvents): Promise<boolean | ErrorResponseObject>;
}

export interface IEntity {
	new (obj: any, isUpdate?: boolean): any;
}

export interface IRepository {
	create(obj: any, options?: CreateOptions): Promise<any | boolean>;
	read(): Promise<any[]>;
	readOne(id: string): Promise<any | null>;
	readBy(where: any): Promise<any | null>;
	readAllBy(where: any): Promise<any | null>;
	update(
		id: string | number,
		obj: any,
		options?: Omit<UpdateOptions, 'where'>
	): Promise<any | null>;
	delete(
		id: string | number,
		options?: DestroyOptions
	): Promise<boolean | null>;
	getByPropertyId?(obj: any): Promise<any>;
	updateStatus(
		id: string,
		status: string,
		options?: Omit<UpdateOptions, 'where'>
	): Promise<any | null>;
}
