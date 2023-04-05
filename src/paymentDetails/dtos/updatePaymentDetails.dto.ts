import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePaymentDetailsDto {
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
