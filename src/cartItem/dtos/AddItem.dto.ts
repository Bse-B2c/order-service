import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddItemDto {
	@IsNotEmpty()
	@IsNumber()
	productId: number;

	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsOptional()
	@IsNumber()
	discount: number;
}
