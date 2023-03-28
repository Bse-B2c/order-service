import { dataSource } from '@src/database';
import { PaymentDetailsController } from '@paymentDetails/paymentDetails.controller';
import { PaymentDetailsService } from '@paymentDetails/paymentDetails.service';
import { PaymentDetails } from '@paymentDetails/entity/paymentDetails.entity';

const repository = dataSource.getRepository(PaymentDetails);
export const paymentDetailsService = new PaymentDetailsService(repository);
export const paymentDetailsController = new PaymentDetailsController(
	paymentDetailsService
);
