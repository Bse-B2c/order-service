import { Router } from 'express';
import { validate } from '@src/common/utils/validate.utils';

const router = Router();

//controller
import { orderDetailsController } from '@src/orderDetails';

//dto
import { OrderDetailsDto } from '@src/orderDetails/dtos/orderDetails.dto';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@src/orderDetails/dtos/search.dto';
import { UpdateOrderDetailsDto } from '@src/orderDetails/dtos/updateOrderDetails.dto';

//validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(OrderDetailsDto), orderDetailsController.create);
router.get('/:id', validateParams(ParamsDto), orderDetailsController.findOne);
router.get('/', validateQuery(SearchDto), orderDetailsController.find);
router.delete('/:id', validateParams(SearchDto), orderDetailsController.delete);
router.patch(
	'/:id',
	validateParams(ParamsDto),
	validateBody(UpdateOrderDetailsDto),
	orderDetailsController.update
);
export default router;
