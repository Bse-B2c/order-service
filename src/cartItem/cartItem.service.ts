import { CartItemService as Service } from '@cartItem/interfaces/cartItemService.interface';
import { CartItem } from '@cartItem/entity/cartItem.entity';
import {
	ArrayContains,
	Equal,
	FindOptionsOrderValue,
	FindOptionsWhere,
	In,
	MoreThanOrEqual,
	Repository,
} from 'typeorm';
import { CartItemDto } from '@cartItem/dtos/cartItem.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { SearchDto } from '@cartItem/dtos/search.dto';
import { ShoppingCartService } from '@shoppingCart/interfaces/shoppingCartService.interface';
import { AddItemDto } from '@cartItem/dtos/AddItem.dto';

export class CartItemService implements Service {
	constructor(
		private repository: Repository<CartItem>,
		private shoppingCartService: ShoppingCartService
	) {}

	create = async ({
		productId,
		quantity,
		price,
		cartId,
	}: CartItemDto): Promise<CartItem> => {
		const shoppingCart = await this.shoppingCartService.findOne(cartId);

		const newCart = await this.repository.create({
			productId,
			quantity,
			price,
			shoppingCart,
		});

		return this.repository.save(newCart);
	};

	addToCart = async (
		userId: number,
		{ productId, price, discount }: AddItemDto
	): Promise<CartItem> => {
		const shoppingCart = await this.shoppingCartService.findCartByUser(userId);
		const cartItem = await this.repository.findOne({
			relations: { shoppingCart: true },
			loadRelationIds: true,
			where: { productId, shoppingCart: Equal(shoppingCart.id) },
		});
		const productPrice = discount ? price - (price * discount) / 100 : price;

		if (!cartItem) {
			const newCartItem = await this.create({
				productId,
				quantity: 1,
				price: productPrice,
				cartId: shoppingCart.id,
			});

			await this.shoppingCartService.updateTotal(shoppingCart.id);
			return newCartItem;
		}
		const newQuantity = cartItem.quantity + 1;

		Object.assign(cartItem, {
			quantity: newQuantity,
			price: productPrice,
		});

		await this.repository.save(cartItem);

		await this.shoppingCartService.updateTotal(shoppingCart.id);

		return cartItem;
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
