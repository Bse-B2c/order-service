import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { OrderItemsService } from '@orderItems/interfaces/orderItemsService.interface';
import { OrderItemsDto } from '@orderItems/dtos/orderItems.dto';
import { SearchDto } from '@orderItems/dtos/search.dto';

export class OrderItemsController {
	constructor(private service: OrderItemsService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { quantity, productId, total } = req.body as OrderItemsDto;

			const response = await this.service.create({
				quantity,

				productId,
				total,
			});

			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	findOne = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const response = await this.service.findOne(+id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const response = await this.service.delete(+id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
	find = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { orderBy, sortOrder, limit, page, ...search } =
				req.query as unknown as SearchDto;
			const response = await this.service.find({
				...search,
				orderBy: orderBy ?? 'total',
				sortOrder: sortOrder ?? 'asc',
				limit: limit || 10,
				page: page || 0,
			});
			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				body: { quantity, productId, total },
				params: { id },
			} = req;

			const response = await this.service.update(+id, {
				quantity,

				productId,
				total,
			});

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}
