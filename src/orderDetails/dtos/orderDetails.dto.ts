import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}