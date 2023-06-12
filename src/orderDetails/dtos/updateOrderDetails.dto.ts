import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderItemDto } from '@orderItems/dtos/orderItems.dto';

export class UpdateOrderDetailsDto {
	@IsNumber()
	@IsNotEmpty()
	total: number;

	@IsNumber()
	@IsNotEmpty()
	userId: number;

	@IsString()
	@IsNotEmpty()
	identifier: string;

	@IsString()
	@IsNotEmpty()
	packageTracking: string;

	@IsNotEmpty()
	orderItems: OrderItemDto;
}
