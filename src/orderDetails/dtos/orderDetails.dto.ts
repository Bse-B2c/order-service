import { OrderItems } from '@src/orderItems/entity/orderItems.entity';
import { PaymentDetails } from '@src/paymentDetails/entity/paymentDetails.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
	orderItems: Array<OrderItems>;

	@IsNotEmpty()
	paymentDetails: PaymentDetails;
}
