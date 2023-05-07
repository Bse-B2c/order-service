import { dataSource } from '@src/database';
import { OrderDetailsController } from '@orderDetails/orderDetails.controller';
import { OrderDetailsService } from '@orderDetails/orderDetails.service';
import { OrderDetails } from '@orderDetails/entity/orderDetails.entity';
import { orderItemsService } from '@src/orderItems';
import { paymentDetailsService } from '@src/paymentDetails';
import { shoppingCartService } from '@src/shoppingCart';

const repository = dataSource.getRepository(OrderDetails);
export const orderDetailsService = new OrderDetailsService(
	repository,
	shoppingCartService,
	orderItemsService,
	paymentDetailsService
);
export const orderDetailsController = new OrderDetailsController(
	orderDetailsService
);
