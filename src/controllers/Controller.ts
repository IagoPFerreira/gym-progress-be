import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IController } from '../interfaces/IController';

export default abstract class Controller<T> implements IController<T> {
	constructor(private _service: IService<T>) {}

	public async create(req: Request, res: Response): Promise<Response<T>> {
		const created = await this._service.create(req.body);

		return res.status(201).json(created);
	}

	public async read(req: Request, res: Response): Promise<Response<T[]>> {
		const founded = await this._service.read();

		return res.status(200).json(founded);
	}

	public async readOne(req: Request, res: Response): Promise<Response<T>> {
		const founded = await this._service.readOne(req.params.id);

		return res.status(200).json(founded);
	}

	public async update(req: Request, res: Response): Promise<Response<T>> {
		const {
			params: { id },
			body,
		} = req;
		const updated = await this._service.update(id, body);

		return res.status(200).json(updated);
	}

	public async delete(req: Request, res: Response): Promise<Response<T>> {
		const deleted = await this._service.delete(req.params.id);

		return res.status(204).json(deleted);
	}
}
