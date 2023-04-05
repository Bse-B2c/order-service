import { PaymentDetails } from '@paymentDetails/entity/paymentDetails.entity';
import { PaymentDetailsDto } from '@paymentDetails/dtos/paymentDetails.dto';
import { SearchDto } from '@paymentDetails/dtos/search.dto';

export interface PaymentDetailsService {
	create(paymentDetails: PaymentDetailsDto): Promise<PaymentDetails>;
	findOne(id: number): Promise<PaymentDetails>;
	delete(id: number): Promise<PaymentDetails>;
	find(search: SearchDto): Promise<Array<PaymentDetails>>;
	update(
		id: number,
		updatedPayment: PaymentDetailsDto
	): Promise<PaymentDetails>;
}
