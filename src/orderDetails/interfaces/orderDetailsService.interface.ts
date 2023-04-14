import { OrderDetailsDto } from '@orderDetails/dtos/orderDetails.dto';
import { SearchDto } from '@orderDetails/dtos/search.dto';
import { OrderDetails } from '@orderDetails/entity/orderDetails.entity';

export interface OrderDetailsService {
	create(orderDetails: OrderDetailsDto): Promise<OrderDetails>;
	findOne(id: number): Promise<OrderDetails>;
	delete(id: number): Promise<OrderDetails>;
	find(search: SearchDto): Promise<Array<OrderDetails>>;
	update(id: number, updatedDetails: OrderDetailsDto): Promise<OrderDetails>;
}
