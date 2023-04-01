import { paymentStatus } from '@src/common/enums/paymentStatus.enum';
import { PaymentDetails } from '@paymentDetails/entity/paymentDetails.entity';
import { FindOptionsSelect } from 'typeorm';
import { PaymentDetailsDto } from '@paymentDetails/dtos/paymentDetails.dto';
//import{}

export interface PaymentDetailsService {
	create(paymentDetails: PaymentDetailsDto): Promise<PaymentDetails>;
	findOne(id: number): Promise<PaymentDetails>;
	delete(id: number): Promise<PaymentDetails>;
}
