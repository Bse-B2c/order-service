import { Router } from 'express';
import { validate } from '@src/common/utils/validate.utils';

const router = Router();

//controller
import { shoppingCartController } from '@src/shoppingCart';

//dto
import { ShoppingCartDto } from '@shoppingCart/dtos/shoppingCart.dto';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@shoppingCart/dtos/search.dto';
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
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	shoppingCartController.findMyCart
);
router.post(
	'/me',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	shoppingCartController.createMyCart
);
router.post('/', validateBody(ShoppingCartDto), shoppingCartController.create);
router.get(
	'/item/total',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	shoppingCartController.getTotalItems
);
router.get(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateParams(ParamsDto),
	shoppingCartController.findOne
);
router.get(
	'/',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateQuery(SearchDto),
	shoppingCartController.find
);
router.delete(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateParams(SearchDto),
	shoppingCartController.delete
);
router.patch(
	'/clear',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	shoppingCartController.clear
);
router.patch(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateParams(ParamsDto),
	validateBody(ShoppingCartDto),
	shoppingCartController.update
);
export default router;
