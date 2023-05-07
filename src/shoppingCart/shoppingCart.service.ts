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

	create = async ({ userId }: ShoppingCartDto): Promise<ShoppingCart> => {
		const newCart = await this.repository.create({
			userId,
		});

		return this.repository.save(newCart);
	};

	getTotalItems = async (userId: number): Promise<number> => {
		const { cartItems } = await this.findCartByUser(userId);

		return cartItems.reduce((total = 0, currentItem) => {
			total += currentItem.quantity;
			return total;
		}, 0);
	};

	clear = async (userId: number): Promise<ShoppingCart> => {
		const cart = await this.findCartByUser(userId);

		Object.assign(cart, { total: 0, cartItems: [] });

		return this.repository.save(cart);
	};

	updateTotal = async (id: number): Promise<ShoppingCart> => {
		const shoppingCart = await this.findOne(id);
		let total = 0;

		for (let i = 0; i < shoppingCart.cartItems.length; i++) {
			const currentItem = shoppingCart.cartItems[i];

			total += currentItem.price * currentItem.quantity;
		}

		Object.assign(shoppingCart, { total });

		return this.repository.save(shoppingCart);
	};

	findCartByUser = async (userId: number): Promise<ShoppingCart> => {
		const cart = await this.repository.findOne({
			relations: { cartItems: true },
			where: { userId },
		});

		if (!cart)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `User don't have a Cart`,
			});

		return cart;
	};

	findOne = async (id: number): Promise<ShoppingCart> => {
		const cart = await this.repository.findOne({
			relations: { cartItems: true },
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
