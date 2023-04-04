import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { PaymentDetailsService } from '@paymentDetails/interfaces/paymentDetailsService.interface';
import { PaymentDetailsDto } from '@paymentDetails/dtos/paymentDetails.dto';
import { SearchDto } from '@paymentDetails/dtos/search.dto';

export class PaymentDetailsController {
	constructor(private service: PaymentDetailsService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { status, provider, type } = req.body as PaymentDetailsDto;

			const response = await this.service.create({
				status,
				provider,
				type,
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
				orderBy: orderBy ?? 'status',
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
				body: { status, provider, type },
				params: { id },
			} = req;

			const response = await this.service.update(+id, {
				status,
				provider,
				type,
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
