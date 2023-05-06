import { ShoppingCartService as Service } from '@shoppingCart/interfaces/shoppingCartService.interface';
import { ShoppingCart } from '@shoppingCart/entity/shoppingCart.entity';
import {
	ArrayContains,
	FindOptionsOrderValue,
	FindOptionsWhere,
	In,
	Repository,
} from 'typeorm';
import { ShoppingCartDto } from '@shoppingCart/dtos/shoppingCart.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { SearchDto } from '@shoppingCart/dtos/search.dto';

export class ShoppingCartService implements Service {
	constructor(private repository: Repository<ShoppingCart>) {}

	create = async ({
		userId,
		total,
	}: ShoppingCartDto): Promise<ShoppingCart> => {
		const newCart = await this.repository.create({
			userId,
			total,
		});

		return this.repository.save(newCart);
	};

	findOne = async (id: number): Promise<ShoppingCart> => {
		const cart = await this.repository.findOne({
			where: { id },
		});

		if (!cart)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Cart ${id} not found`,
			});

		return cart;
	};

	delete = async (id: number) => {
		const cart = await this.findOne(id);

		await this.repository.delete(id);

		return cart;
	};

	find = async (search: SearchDto): Promise<Array<ShoppingCart>> => {
		const {
			ids,
			total,
			userId,
			limit = 10,
			page = 0,

			sortOrder = 'asc',
		} = search;

		let where: FindOptionsWhere<ShoppingCart> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (total) where = { ...where, total: ArrayContains(total) };

		if (userId) where = { ...where, userId: ArrayContains(userId) };

		return this.repository.find({
			where,
			order: {
				total: sortOrder as FindOptionsOrderValue,
			},
			take: limit,
			skip: page * limit,
		});
	};

	update = async (
		id: number,
		updatedCart: ShoppingCartDto
	): Promise<ShoppingCart> => {
		const items = await this.findOne(id);

		Object.assign(items, updatedCart);

		return this.repository.save(items);
	};
}