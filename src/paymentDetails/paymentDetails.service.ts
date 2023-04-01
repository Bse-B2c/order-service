import { Repository } from 'typeorm';
import { PaymentDetailsService as Service } from '@paymentDetails/interfaces/paymentDetailsService.interface';
import { PaymentDetailsDto } from '@paymentDetails/dtos/paymentDetails.dto';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { PaymentDetails } from './entity/paymentDetails.entity';

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
}
