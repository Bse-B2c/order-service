import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class BaseSearchFilter {
	@IsOptional()
	@IsIn(['DESC', 'ASC'])
	sortOrder?: string;

	@IsNumber({}, { message: 'page must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	page?: number;

	@IsNumber({}, { message: 'limit must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	limit?: number;
}
