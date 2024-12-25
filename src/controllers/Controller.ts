import { Response } from 'express';
import { IController, IService } from '../interfaces/Generics.interface';
import { CustomRequest } from '../interfaces/CustomRequest.interface';

export default class Controller implements IController {
	constructor(protected _service: IService) {}

	public async create(req: CustomRequest, res: Response): Promise<Response> {
		const { body, files } = req;
		const data = files ? { ...body, files } : body;

		const eventEmitter = req.app.get('eventEmitter');
		const created = await this._service.create(data, { eventEmitter });

		return res.status(201).json(created);
	}

	public async read(req: CustomRequest, res: Response): Promise<Response> {
		const founded = await this._service.read();

		return res.status(200).json(founded);
	}

	public async readOne(
		req: CustomRequest,
		res: Response,
		canAccess: string[]
	): Promise<Response> {
		const founded = await this._service.readOne(req.params.id, canAccess);

		return res.status(200).json(founded);
	}

	public async update(
		req: CustomRequest,
		res: Response,
		canAccess: string[]
	): Promise<Response> {
		const {
			params: { id },
			body,
		} = req;
		const updated = await this._service.update(id, body);

		return res.status(200).json(updated);
	}

	public async delete(
		req: CustomRequest,
		res: Response,
		canAccess: string[]
	): Promise<Response> {
		const deleted = await this._service.delete(req.params.id);

		return res.status(204).json(deleted);
	}
}
