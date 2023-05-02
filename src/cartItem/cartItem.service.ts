import { CartItemService as Service } from '@cartItem/interfaces/cartItemService.interface';
import { CartItem } from '@cartItem/entity/cartItem.entity';
import { Repository } from 'typeorm';
import { CartItemDto } from '@cartItem/dtos/cartItem.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';

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
}
