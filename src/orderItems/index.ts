import { dataSource } from '@src/database';
import { OrderItemsController } from '@orderItems/orderItems.controller';
import { OrderItemsService } from '@orderItems/orderItems.service';
import { OrderItems } from '@orderItems/entity/orderItems.entity';

const repository = dataSource.getRepository(OrderItems);
export const orderItemsService = new OrderItemsService(repository);
export const orderItemsController = new OrderItemsController(orderItemsService);
