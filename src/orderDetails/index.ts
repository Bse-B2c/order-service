import { dataSource } from '@src/database';
import { OrderDetailsController } from '@orderDetails/orderDetails.controller';
import { OrderDetailsService } from '@orderDetails/orderDetails.service';
import { OrderDetails } from '@orderDetails/entity/orderDetails.entity';
import { orderItemsService } from '@orderItems/index';
import { paymentDetailsService } from '@paymentDetails/index';

const repository = dataSource.getRepository(OrderDetails);
export const orderDetailsService = new OrderDetailsService(
	repository,
	orderItemsService,
	paymentDetailsService
);
export const orderDetailsController = new OrderDetailsController(
	orderDetailsService
);
