import { OrderItemsService as Service } from '@orderItems/interfaces/orderItemsService.interface';
import {
	ArrayContains,
	Equal,
	FindOptionsOrderValue,
	FindOptionsWhere,
	In,
	MoreThanOrEqual,
	Repository,
} from 'typeorm';
import { OrderItems } from '@orderItems/entity/orderItems.entity';
import { OrderItemsDto } from '@orderItems/dtos/orderItems.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { UpdateOrderItemsDto } from './dtos/updateOrderItems.dto';
import { SearchDto } from './dtos/search.dto';

export class OrderItemsService implements Service {
	constructor(private repository: Repository<OrderItems>) {}

	create = async ({
		quantity,
		purchaseDate,
		productId,
		total,
	}: OrderItemsDto): Promise<OrderItems> => {
		const newItems = await this.repository.create({
			quantity,
			purchaseDate,
			productId,
			total,
		});
		return this.repository.save(newItems);
	};

	findOne = async (id: number): Promise<OrderItems> => {
		const items = await this.repository.findOne({
			relations: { orderDetails: true },
			where: { id },
		});

		if (!items)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Item list ${id} not found`,
			});

		return items;
	};

	delete = async (id: number) => {
		const items = await this.findOne(id);

		await this.repository.delete(id);

		return items;
	};

	find = async (search: SearchDto): Promise<Array<OrderItems>> => {
		const {
			ids,
			quantity,
			total,
			purchaseDate,
			productId,
			limit = 10,
			page = 0,
			orderBy = 'status',
			sortOrder = 'asc',
		} = search;

		let where: FindOptionsWhere<OrderItems> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (quantity) where = { ...where, quantity: ArrayContains(quantity) };

		if (total) where = { ...where, total: ArrayContains(total) };

		if (purchaseDate)
			where = {
				...where,
				purchaseDate: MoreThanOrEqual(new Date(purchaseDate)),
			};

		if (productId) where = { ...where, productId: ArrayContains(productId) };

		return this.repository.find({
			relations: { orderDetails: true },
			loadRelationIds: true,
			where,
			order: {
				[orderBy]: sortOrder as FindOptionsOrderValue,
				quantity: sortOrder as FindOptionsOrderValue,
			},
			take: limit,
			skip: page * limit,
		});
	};

	update = async (
		id: number,
		updatedItems: UpdateOrderItemsDto
	): Promise<OrderItems> => {
		const items = await this.findOne(id);

		Object.assign(items, updatedItems);

		return this.repository.save(items);
	};
}
