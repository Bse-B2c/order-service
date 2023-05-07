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
import {
	ensureAuthenticated,
	verifyRoles,
} from '@middleware/ensureAuthenticated';
import { Role } from '@common/enums/role.enum';

//validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.get(
	'/me',
	validateQuery(SearchDto),
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	orderDetailsController.findMyOrderDetails
);
router.post(
	'/',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateBody(OrderDetailsDto),
	orderDetailsController.create
);
router.get(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateParams(ParamsDto),
	orderDetailsController.findOne
);
router.get(
	'/',
	ensureAuthenticated,
	verifyRoles([Role.ADMIN]),
	validateQuery(SearchDto),
	orderDetailsController.find
);
router.delete(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.ADMIN]),
	validateParams(SearchDto),
	orderDetailsController.delete
);
router.patch(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.ADMIN]),
	validateParams(ParamsDto),
	validateBody(UpdateOrderDetailsDto),
	orderDetailsController.update
);
export default router;
