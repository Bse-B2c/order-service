import {
	ArrayContains,
	Equal,
	FindOptionsOrderValue,
	FindOptionsWhere,
	In,
	MoreThanOrEqual,
	Repository,
} from 'typeorm';
import { PaymentDetailsService as Service } from '@paymentDetails/interfaces/paymentDetailsService.interface';
import { PaymentDetailsDto } from '@paymentDetails/dtos/paymentDetails.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { PaymentDetails } from '@paymentDetails/entity/paymentDetails.entity';
import { SearchDto } from '@paymentDetails/dtos/search.dto';
import { UpdatePaymentDetailsDto } from '@paymentDetails/dtos/updatePaymentDetails.dto';

export class PaymentDetailsService implements Service {
	constructor(private repository: Repository<PaymentDetails>) {}

	create = async ({
		status,
		provider,
		type,
	}: PaymentDetailsDto): Promise<PaymentDetails> => {
		const newPayment = this.repository.create({
			status,
			provider,
			type,
			date: new Date(),
		});
		return this.repository.save(newPayment);
	};

	findOne = async (id: number): Promise<PaymentDetails> => {
		const payment = await this.repository.findOne({
			relations: { orderDetails: true },
			where: { id },
		});

		if (!payment)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Payment ${id} not found`,
			});

		return payment;
	};

	delete = async (id: number) => {
		const payment = await this.findOne(id);

		await this.repository.delete(id);

		return payment;
	};

	find = async (search: SearchDto): Promise<Array<PaymentDetails>> => {
		const {
			ids,
			status,
			provider,
			date,
			type,
			limit = 10,
			page = 0,
			orderBy = 'status',
			sortOrder = 'asc',
		} = search;

		let where: FindOptionsWhere<PaymentDetails> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (status) where = { ...where, status: ArrayContains(status) };

		if (provider) where = { ...where, provider: Equal(provider) };

		if (date) where = { ...where, date: MoreThanOrEqual(new Date(date)) };

		if (type) where = { ...where, type: ArrayContains(type) };

		return this.repository.find({
			relations: { orderDetails: true },
			loadRelationIds: true,
			where,
			order: {
				[orderBy]: sortOrder as FindOptionsOrderValue,
				status: sortOrder as FindOptionsOrderValue,
			},
			take: limit,
			skip: page * limit,
		});
	};

	update = async (
		id: number,
		updatedPayment: UpdatePaymentDetailsDto
	): Promise<PaymentDetails> => {
		const payment = await this.findOne(id);

		Object.assign(payment, updatedPayment);

		return this.repository.save(payment);
	};
}
