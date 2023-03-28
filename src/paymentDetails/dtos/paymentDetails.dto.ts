import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentDetailsDto {
	@IsNotEmpty()
	@IsNumber()
	status: Array<number>;

	@IsNotEmpty()
	@IsString()
	provider: string;

	@IsNotEmpty()
	@IsISO8601()
	date: Date;

	@IsNotEmpty()
	@IsNumber()
	type: Array<number>;
}
