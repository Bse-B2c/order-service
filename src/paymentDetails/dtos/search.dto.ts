import { IsIn, IsISO8601, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseSearchFilter } from '@src/common/dtos/baseSearchFilter.dto';
import { formatQueryToArray } from '@src/common/utils/query.utils';

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
	status: Array<number>;

	@IsOptional()
	@IsString()
	provider: string;

	@IsOptional()
	@IsISO8601()
	date: string;

	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	type: Array<number>;

	@IsString()
	@IsIn(['id', 'status', 'provider', 'date', 'type'])
	@IsOptional()
	orderBy?: string;
}
