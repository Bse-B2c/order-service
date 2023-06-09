import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { OrderDetailsService } from '@orderDetails/interfaces/orderDetailsService.interface';
import { OrderDetailsDto } from '@orderDetails/dtos/orderDetails.dto';
import { SearchDto } from '@orderDetails/dtos/search.dto';

export class OrderDetailsController {
	constructor(private service: OrderDetailsService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { shoppingCartId, paymentType, addressId } =
				req.body as OrderDetailsDto;

			const response = await this.service.create({
				shoppingCartId,
				paymentType,
				addressId,
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

	findMyOrderDetails = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { orderBy, sortOrder, limit, page, ...search } =
				req.query as unknown as SearchDto;
			const userId = req.user ? req.user.id : -1;

			const response = await this.service.find({
				...search,
				userId: [userId],
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
				body: { identifier, packageTracking, userId, total, orderItems },
				params: { id },
			} = req;

			const response = await this.service.update(+id, {
				identifier,
				packageTracking,
				userId,
				orderItems,
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
