import { OrderDetailsService as Service } from '@orderDetails/interfaces/orderDetailsService.interface';
import {
	ArrayContains,
	Equal,
	FindOptionsOrderValue,
	FindOptionsWhere,
	In,
	MoreThanOrEqual,
	Repository,
} from 'typeorm';
import { OrderDetails } from '@orderDetails/entity/orderDetails.entity';
import { OrderDetailsDto } from '@orderDetails/dtos/orderDetails.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { UpdateOrderDetailsDto } from '@orderDetails/dtos/updateOrderDetails.dto';
import { SearchDto } from '@orderDetails/dtos/search.dto';
import { OrderItemsService } from '@orderItems/interfaces/orderItemsService.interface';
import { PaymentDetailsService } from '@paymentDetails/interfaces/paymentDetailsService.interface';
import { OrderItemsDto } from '@orderItems/dtos/orderItems.dto';
import { ShoppingCartService } from '@shoppingCart/interfaces/shoppingCartService.interface';
import axios from 'axios';
import { paymentStatus } from '@common/enums/paymentStatus.enum';
import { v4 } from 'uuid';
import { Product } from '@orderDetails/interfaces/Product';
import { ApiResponse } from '@orderDetails/interfaces/ApiResponse';

export class OrderDetailsService implements Service {
	constructor(
		private repository: Repository<OrderDetails>,
		private shoppingCartService: ShoppingCartService,
		private itemsService: OrderItemsService,
		private paymentDetailsService: PaymentDetailsService
	) {}

	getProducts = async (
		productIds: Array<number>
	): Promise<{ [key: number]: Product | null } | null> => {
		const response: { data: ApiResponse<Array<Product>> } = await axios.get(
			`${process.env['PRODUCT_HOST']}/api/product?ids=${productIds.join(
				','
			)}&page=0&limit=${productIds.length}`
		);

		return response.data.statusCode === HttpStatusCode.OK && response.data
			? response.data.data.reduce(
					(
						acc: { [key: number]: Product | null } = {},
						currentProduct: Product
					) => {
						const key = currentProduct.id;
						if (!acc[key])
							acc[key] = {
								id: currentProduct.id,
								price: currentProduct.price,
								discount: currentProduct.discount,
							};

						return acc;
					},
					{}
			  )
			: null;
	};

	create = async ({
		shoppingCartId,
		paymentType,
		addressId,
	}: OrderDetailsDto): Promise<OrderDetails> => {
		const shoppingCart = await this.shoppingCartService.findOne(shoppingCartId);
		const productIds = shoppingCart.cartItems.map(item => item.productId);
		const products = await this.getProducts(productIds);
		let orderItems: Array<OrderItemsDto> = [];
		let total = 0;

		if (
			Array.isArray(shoppingCart.cartItems) &&
			shoppingCart.cartItems.length > 0 &&
			products
		) {
			for (let i = 0; i < shoppingCart.cartItems.length; i++) {
				const currentItem = shoppingCart.cartItems[i];
				const currentProduct = products[currentItem.productId];

				if (!currentProduct)
					throw new HttpException({
						statusCode: HttpStatusCode.NOT_FOUND,
						message: 'Product not found',
					});

				const { price, discount } = currentProduct;
				const newPrice =
					discount && discount.active
						? price - (price * discount.discountPercent) / 100
						: price;
				const totalPrice = newPrice * currentItem.quantity;

				total += totalPrice;

				const newOrderItems = await this.itemsService.create({
					quantity: currentItem.quantity,
					productId: currentItem.productId,
					price: newPrice,
					total: totalPrice,
				});
				orderItems.push(newOrderItems);
			}
			const newPaymentDetails = await this.paymentDetailsService.create({
				status: paymentStatus.WAITING,
				type: paymentType,
				provider: '',
			});

			const newOrderDetails = this.repository.create({
				identifier: v4(),
				packageTracking: '',
				userId: shoppingCart.userId,
				orderItems: orderItems,
				paymentDetails: newPaymentDetails,
				total,
				addressId,
			});
			await this.repository.save(newOrderDetails);

			await this.shoppingCartService.clear(shoppingCart.userId);

			return newOrderDetails;
		} else {
			throw new HttpException({
				statusCode: HttpStatusCode.INTERNAL_SERVER,
				message: 'Something went wrong',
			});
		}
	};

	findOne = async (id: number): Promise<OrderDetails> => {
		const order = await this.repository.findOne({
			relations: { orderItems: true, paymentDetails: true },
			where: { id },
		});

		if (!order)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Order ${id} not found`,
			});

		return order;
	};

	delete = async (id: number) => {
		const items = await this.findOne(id);

		await this.repository.delete(id);

		return items;
	};

	find = async (search: SearchDto): Promise<Array<OrderDetails>> => {
		const {
			ids,
			identifier,
			packageTracking,
			userId,
			date,
			total,
			status,
			limit = 10,
			page = 0,
			orderBy = 'total',
			sortOrder = 'ASC',
		} = search;

		let where: FindOptionsWhere<OrderDetails> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (identifier) where = { ...where, identifier: ArrayContains(identifier) };
		if (packageTracking)
			where = { ...where, packageTracking: ArrayContains(packageTracking) };

		if (total) where = { ...where, total: ArrayContains(total) };

		if (date)
			where = {
				...where,
				date: MoreThanOrEqual(new Date(date)),
			};

		if (userId) where = { ...where, userId: In(userId) };

		if (status) where = { ...where, paymentDetails: { status: Equal(status) } };

		return this.repository.find({
			relations: { orderItems: true, paymentDetails: true },
			where,
			order: {
				[orderBy]: sortOrder as FindOptionsOrderValue,
				total: sortOrder as FindOptionsOrderValue,
			},
			take: limit,
			skip: page * limit,
		});
	};

	update = async (
		id: number,
		updatedDetails: UpdateOrderDetailsDto
	): Promise<OrderDetails> => {
		const order = await this.findOne(id);

		Object.assign(order, updatedDetails);

		return this.repository.save(order);
	};
}
