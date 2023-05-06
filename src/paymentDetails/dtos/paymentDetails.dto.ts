import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentDetailsDto {
	@IsNotEmpty()
	@IsNumber()
	status: number;

	@IsNotEmpty()
	@IsString()
	provider: string;

	@IsNotEmpty()
	@IsNumber()
	type: number;
}
