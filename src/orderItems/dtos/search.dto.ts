import { BaseSearchFilter } from '@src/common/dtos/baseSearchFilter.dto';
import {
	IsISO8601,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
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
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);
		return value;
	})
	quantity: Array<number>;

	@IsOptional()
	@IsISO8601()
	purchaseDate: Date;

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
	total: Array<number>;

	@IsString()
	@IsIn(['id', 'quantity', 'purchaseDate', 'productId', 'total'])
	@IsOptional()
	orderBy?: string;
}
