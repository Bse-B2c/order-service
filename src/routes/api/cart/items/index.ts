import { Router } from 'express';
import { validate } from '@src/common/utils/validate.utils';

const router = Router();

//controller
import { cartItemController } from '@src/cartItem';

//dto
import { CartItemDto } from '@cartItem/dtos/cartItem.dto';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@cartItem/dtos/search.dto';
import {
	ensureAuthenticated,
	verifyRoles,
} from '@middleware/ensureAuthenticated';
import { Role } from '@common/enums/role.enum';

//validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(CartItemDto), cartItemController.create);
router.get('/:id', validateParams(ParamsDto), cartItemController.findOne);
router.get('/', validateQuery(SearchDto), cartItemController.find);
router.delete('/:id', validateParams(SearchDto), cartItemController.delete);
router.patch(
	'/add',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	cartItemController.addToCart
);
router.patch(
	'/:id',
	validateParams(ParamsDto),
	validateBody(CartItemDto),
	cartItemController.update
);
export default router;
