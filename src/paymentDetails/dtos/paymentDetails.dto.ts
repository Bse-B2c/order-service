import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentDetailsDto {
	@IsNotEmpty()
	@IsNumber()
	status: Array<number>;

	@IsNotEmpty()
	@IsString()
	provider: string;

	@IsNotEmpty()
	@IsNumber()
	type: Array<number>;
}
