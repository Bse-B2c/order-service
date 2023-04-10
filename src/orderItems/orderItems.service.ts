import { OrderItemsService as Service } from '@orderItems/interfaces/orderItemsService.interface';
import { Repository } from 'typeorm';
import { OrderItems } from '@orderItems/entity/orderItems.entity';
import { OrderItemsDto } from '@orderItems/dtos/orderItems.dto';

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
}
