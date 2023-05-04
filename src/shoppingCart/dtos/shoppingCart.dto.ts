import { IsNumber, IsNotEmpty } from 'class-validator';

export class ShoppingCartDto {
	@IsNotEmpty()
	@IsNumber()
	userId: number;

	@IsNotEmpty()
	@IsNumber()
	total: number;
}
