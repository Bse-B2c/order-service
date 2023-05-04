import { dataSource } from '@src/database';
import { ShoppingCartController } from '@shoppingCart/shoppingCart.controller';
import { ShoppingCartService } from '@shoppingCart/shoppingCart.service';
import { ShoppingCart } from '@shoppingCart/entity/shoppingCart.entity';

const repository = dataSource.getRepository(ShoppingCart);
export const shoppingCartService = new ShoppingCartService(repository);
export const shoppingCartController = new ShoppingCartController(
	shoppingCartService
);
