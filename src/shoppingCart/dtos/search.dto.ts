import { BaseSearchFilter } from '@src/common/dtos/baseSearchFilter.dto';
import { formatQueryToArray } from '@src/common/utils/query.utils';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

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
	userId: Array<number>;

	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	total: Array<number>;
}
