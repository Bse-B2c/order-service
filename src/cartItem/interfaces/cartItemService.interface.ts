import { CartItemDto } from '@cartItem/dtos/cartItem.dto';
import { SearchDto } from '@cartItem/dtos/search.dto';
import { CartItem } from '@cartItem/entity/cartItem.entity';
import { AddItemDto } from '@cartItem/dtos/AddItem.dto';

export interface CartItemService {
	create(cartItem: CartItemDto): Promise<CartItem>;
	findOne(id: number): Promise<CartItem>;
	delete(id: number): Promise<CartItem>;
	find(search: SearchDto): Promise<Array<CartItem>>;
	update(id: number, updatedItems: CartItemDto): Promise<CartItem>;
	addToCart(userId: number, item: AddItemDto): Promise<CartItem>;
}
