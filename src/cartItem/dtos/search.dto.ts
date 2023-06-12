import { BaseSearchFilter } from '@src/common/dtos/baseSearchFilter.dto';
import { formatQueryToArray } from '@src/common/utils/query.utils';
import { Transform } from 'class-transformer';
import { IsISO8601, IsOptional } from 'class-validator';

export class SearchDto extends BaseSearchFilter {
	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	ids: Array<number>;

	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	productId: Array<number>;

	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	quantity: Array<number>;

	@IsOptional()
	@IsISO8601()
	date: Date;

	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	price: Array<number>;
}
