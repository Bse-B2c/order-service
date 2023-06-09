import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { ShoppingCartService } from '@shoppingCart/interfaces/shoppingCartService.interface';
import { ShoppingCartDto } from '@shoppingCart/dtos/shoppingCart.dto';
import { SearchDto } from '@shoppingCart/dtos/search.dto';

export class ShoppingCartController {
	constructor(private service: ShoppingCartService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req.body as ShoppingCartDto;

			const response = await this.service.create({
				userId,
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

	createMyCart = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user?.id ?? -1;

			const response = await this.service.create({
				userId,
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

	findMyCart = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user?.id ?? -1;

			const response = await this.service.findCartByUser(+userId);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
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

	clear = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user?.id ?? -1;

			const response = await this.service.clear(userId);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	getTotalItems = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user?.id ?? -1;

			const response = await this.service.getTotalItems(userId);

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
			const { sortOrder, limit, page, ...search } =
				req.query as unknown as SearchDto;
			const response = await this.service.find({
				...search,
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
				body: { userId },
				params: { id },
			} = req;

			const response = await this.service.update(+id, {
				userId,
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
