import { CartItemService as Service } from '@cartItem/interfaces/cartItemService.interface';
import { CartItem } from '@cartItem/entity/cartItem.entity';
import { Repository } from 'typeorm';
import { CartItemDto } from '@cartItem/dtos/cartItem.dto';

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
}
