import { dataSource } from '@src/database';
import { CartItemController } from '@cartItem/cartItem.controller';
import { CartItemService } from '@cartItem/cartItem.service';
import { CartItem } from '@cartItem/entity/cartItem.entity';
import { shoppingCartService } from '@src/shoppingCart';

const repository = dataSource.getRepository(CartItem);
export const cartItemService = new CartItemService(
	repository,
	shoppingCartService
);
export const cartItemController = new CartItemController(cartItemService);
