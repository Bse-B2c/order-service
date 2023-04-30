import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
