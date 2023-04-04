import { paymentStatus } from '@src/common/enums/paymentStatus.enum';
import { PaymentDetails } from '@paymentDetails/entity/paymentDetails.entity';
import { FindOptionsSelect } from 'typeorm';
import { PaymentDetailsDto } from '@paymentDetails/dtos/paymentDetails.dto';
import { SearchDto } from '../dtos/search.dto';
//import{}

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
