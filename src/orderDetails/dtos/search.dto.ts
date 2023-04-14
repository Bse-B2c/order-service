import { BaseSearchFilter } from '@src/common/dtos/baseSearchFilter.dto';
import { IsISO8601, IsIn, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { formatQueryToArray } from '@src/common/utils/query.utils';

export class SearchDto extends BaseSearchFilter {
	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	ids: Array<number>;

	@IsOptional()
	@IsString()
	identifier: Array<string>;

	@IsOptional()
	@IsString()
	packageTracking: Array<string>;

	@IsOptional()
	@IsISO8601()
	date: Date;

	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	userId: Array<number>;

	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	total: Array<number>;

	@IsString()
	@IsIn(['id', 'identifier', 'packageTracking', 'date', 'userId', 'total'])
	@IsOptional()
	orderBy?: string;
}
