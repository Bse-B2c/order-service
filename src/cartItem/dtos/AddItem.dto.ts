import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddItemDto {
	@IsNotEmpty()
	@IsNumber()
	productId: number;

	@IsNotEmpty()
	@IsNumber()
	price: number;
}
