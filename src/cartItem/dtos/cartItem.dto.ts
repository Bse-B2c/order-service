import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartItemDto {
	@IsNotEmpty()
	@IsNumber()
	productId: number;

	@IsNotEmpty()
	@IsNumber()
	quantity: number;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsNotEmpty()
	@IsNumber()
	cartId: number;
}
