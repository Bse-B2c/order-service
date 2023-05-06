import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveItemDto {
	@IsNotEmpty()
	@IsNumber()
	productId: number;
}
