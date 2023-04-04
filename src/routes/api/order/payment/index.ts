import { Router } from 'express';
import { validate } from '@src/common/utils/validate.utils';

const router = Router();

//controller
import { paymentDetailsController } from '@src/paymentDetails';

//dto
import { PaymentDetailsDto } from '@src/paymentDetails/dtos/paymentDetails.dto';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@src/paymentDetails/dtos/search.dto';
import { UpdatePaymentDetailsDto } from '@src/paymentDetails/dtos/updatePaymentDetails.dto';

//validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post(
	'/',
	validateBody(PaymentDetailsDto),
	paymentDetailsController.create
);
router.get('/:id', validateParams(ParamsDto), paymentDetailsController.findOne);
router.get('/', validateQuery(SearchDto), paymentDetailsController.find);
router.delete(
	'/:id',
	validateParams(SearchDto),
	paymentDetailsController.delete
);
router.patch(
	'/:id',
	validateParams(ParamsDto),
	validateBody(UpdatePaymentDetailsDto),
	paymentDetailsController.update
);

export default router;
