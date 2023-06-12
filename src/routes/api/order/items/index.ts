import { Router } from 'express';
import { validate } from '@src/common/utils/validate.utils';

const router = Router();

//controller
import { orderItemsController } from '@src/orderItems';

//dto
import { OrderItemsDto } from '@src/orderItems/dtos/orderItems.dto';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@src/orderItems/dtos/search.dto';
import { UpdateOrderItemsDto } from '@src/orderItems/dtos/updateOrderItems.dto';

//validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(OrderItemsDto), orderItemsController.create);
router.get('/:id', validateParams(ParamsDto), orderItemsController.findOne);
router.get('/', validateQuery(SearchDto), orderItemsController.find);
router.delete('/:id', validateParams(SearchDto), orderItemsController.delete);
router.patch(
	'/:id',
	validateParams(ParamsDto),
	validateBody(UpdateOrderItemsDto),
	orderItemsController.update
);
export default router;
