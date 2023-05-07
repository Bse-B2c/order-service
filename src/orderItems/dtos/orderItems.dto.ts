import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemsDto {
	@IsNotEmpty()
	@IsNumber()
	quantity: number;

	@IsNotEmpty()
	@IsNumber()
	productId: number;

	@IsNotEmpty()
	@IsNumber()
	total: number;

	@IsNotEmpty()
	@IsNumber()
	price: number;
}
