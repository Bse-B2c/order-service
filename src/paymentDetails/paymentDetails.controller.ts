import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { PaymentDetailsService } from '@paymentDetails/interfaces/paymentDetailsService.interface';
import { PaymentDetailsDto } from '@paymentDetails/dtos/paymentDetails.dto';
import { SearchDto } from '@paymentDetails/dtos/search.dto';

export class PaymentDetailsController {
	constructor(private service: PaymentDetailsService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { status, provider, type, date } = req.body as PaymentDetailsDto;

			const response = await this.service.create({
				status,
				provider,
				type,
				date,
			});

			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}