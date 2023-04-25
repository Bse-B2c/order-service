import { OrderDetailsService as Service } from '@orderDetails/interfaces/orderDetailsService.interface';
import {
	ArrayContains,
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

export class OrderDetailsService implements Service {
	constructor(
		private repository: Repository<OrderDetails>,
		private itemsService: OrderItemsService,
		private detailsService: PaymentDetailsService
	) {}

	create = async ({
		packageTracking,
		userId,
		orderItems,
		paymentDetails,
		total,
	}: OrderDetailsDto): Promise<OrderDetails> => {
		let items: Array<OrderItemsDto> = []; //TODO:limpar carrinho on create
		let details = undefined;

		if (orderItems) {
			for (let i = 0; i < orderItems.length; i++) {
				const item = orderItems[i];

				const newItem = await this.itemsService.create(item);
				items.push(newItem);
			}
		}

		if (paymentDetails)
			details = await this.detailsService.create(paymentDetails);

		const newDetails = this.repository.create({
			identifier: '',
			packageTracking,
			userId,
			orderItems: items,
			paymentDetails: details,
			total,
		});
		return this.repository.save(newDetails);
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
			limit = 10,
			page = 0,
			orderBy = 'status',
			sortOrder = 'asc',
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

		if (userId) where = { ...where, userId: ArrayContains(userId) };

		return this.repository.find({
			relations: { orderItems: true, paymentDetails: true },
			loadRelationIds: true,
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
