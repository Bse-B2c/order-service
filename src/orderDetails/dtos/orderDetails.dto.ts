import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderItemsDto } from '@orderItems/dtos/orderItems.dto';
import { PaymentDetailsDto } from '@paymentDetails/dtos/paymentDetails.dto';

export class OrderDetailsDto {
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
	orderItems: Array<OrderItemsDto>;

	@IsNotEmpty()
	paymentDetails: PaymentDetailsDto;

	@IsNumber()
	@IsNotEmpty()
	addressId: number;
}
