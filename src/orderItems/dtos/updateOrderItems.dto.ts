import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderItemsDto {
	@IsNotEmpty()
	@IsNumber()
	quantity: number;

	@IsNotEmpty()
	@IsNumber()
	productId: number;

	@IsNotEmpty()
	@IsNumber()
	total: number;
}
