import { dataSource } from '@src/database';
import { OrderDetailsController } from '@orderDetails/orderDetails.controller';
import { OrderDetailsService } from '@orderDetails/orderDetails.service';
import { OrderDetails } from '@orderDetails/entity/orderDetails.entity';

const repository = dataSource.getRepository(OrderDetails);
export const orderDetailsService = new OrderDetailsService(repository);
export const orderDetailsController = new OrderDetailsController(
	orderDetailsService
);
