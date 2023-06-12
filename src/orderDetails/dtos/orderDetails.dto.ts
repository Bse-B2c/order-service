import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDetailsDto {
	@IsNumber()
	@IsNotEmpty()
	shoppingCartId: number;

	@IsNumber()
	@IsNotEmpty()
	paymentType: number;

	@IsNumber()
	@IsNotEmpty()
	addressId: number;
}
