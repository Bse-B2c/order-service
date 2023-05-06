import { ShoppingCartDto } from '@shoppingCart/dtos/shoppingCart.dto';
import { SearchDto } from '@shoppingCart/dtos/search.dto';
import { ShoppingCart } from '@shoppingCart/entity/shoppingCart.entity';

export interface ShoppingCartService {
	create(shoppingCart: ShoppingCartDto): Promise<ShoppingCart>;
	findOne(id: number): Promise<ShoppingCart>;
	findCartByUser(userId: number): Promise<ShoppingCart>;
	updateTotal(id: number): Promise<ShoppingCart>;
	delete(id: number): Promise<ShoppingCart>;
	find(search: SearchDto): Promise<Array<ShoppingCart>>;
	update(id: number, updatedCart: ShoppingCartDto): Promise<ShoppingCart>;
}
