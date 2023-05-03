import { dataSource } from '@src/database';
import { CartItemController } from '@cartItem/cartItem.controller';
import { CartItemService } from '@cartItem/cartItem.service';
import { CartItem } from '@cartItem/entity/cartItem.entity';

const repository = dataSource.getRepository(CartItem);
export const cartItemService = new CartItemService(repository);
export const cartItemController = new CartItemController(cartItemService);
