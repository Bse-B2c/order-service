import { CartItemService as Service } from '@cartItem/interfaces/cartItemService.interface';
import { CartItem } from '@cartItem/entity/cartItem.entity';
import {
	ArrayContains,
	FindOptionsOrderValue,
	FindOptionsWhere,
	In,
	MoreThanOrEqual,
	Repository,
} from 'typeorm';
import { CartItemDto } from '@cartItem/dtos/cartItem.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { SearchDto } from '@cartItem/dtos/search.dto';

export class CartItemService implements Service {
	constructor(private repository: Repository<CartItem>) {}

	create = async ({
		productId,
		quantity,
		price,
	}: CartItemDto): Promise<CartItem> => {
		const newCart = await this.repository.create({
			productId,
			quantity,
			price,
		});

		return this.repository.save(newCart);
	};

	findOne = async (id: number): Promise<CartItem> => {
		const item = await this.repository.findOne({
			where: { id },
		});

		if (!item)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Item ${id} not found`,
			});

		return item;
	};

	delete = async (id: number) => {
		const item = await this.findOne(id);

		await this.repository.delete(id);

		return item;
	};

	find = async (search: SearchDto): Promise<Array<CartItem>> => {
		const {
			ids,
			quantity,
			date,
			productId,
			limit = 10,
			page = 0,

			sortOrder = 'asc',
		} = search;

		let where: FindOptionsWhere<CartItem> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (quantity) where = { ...where, quantity: ArrayContains(quantity) };

		if (productId) where = { ...where, productId: ArrayContains(productId) };

		if (date)
			where = {
				...where,
				date: MoreThanOrEqual(new Date(date)),
			};

		return this.repository.find({
			where,
			order: {
				productId: sortOrder as FindOptionsOrderValue,
			},
			take: limit,
			skip: page * limit,
		});
	};

	update = async (id: number, updatedItems: CartItemDto): Promise<CartItem> => {
		const items = await this.findOne(id);

		Object.assign(items, updatedItems);

		return this.repository.save(items);
	};
}
