import { OrderItemsDto } from '@orderItems/dtos/orderItems.dto';
import { SearchDto } from '@orderItems/dtos/search.dto';
import { OrderItems } from '@orderItems/entity/orderItems.entity';

export interface OrderItemsService {
	create(orderItems: OrderItemsDto): Promise<OrderItems>;
	findOne(id: number): Promise<OrderItems>;
	delete(id: number): Promise<OrderItems>;
	find(search: SearchDto): Promise<Array<OrderItems>>;
	update(id: number, updatedItems: OrderItemsDto): Promise<OrderItems>;
}
