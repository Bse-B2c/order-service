import { Router } from 'express';
import { validate } from '@src/common/utils/validate.utils';

const router = Router();

//controller
import { shoppingCartController } from '@src/shoppingCart';

//dto
import { ShoppingCartDto } from '@shoppingCart/dtos/shoppingCart.dto';
import { ParamsDto } from '@src/common/dtos/params.dto';
import { SearchDto } from '@shoppingCart/dtos/search.dto';

//validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.get('/me', shoppingCartController.findMyCart);
router.post('/me', shoppingCartController.createMyCart);
router.post('/', validateBody(ShoppingCartDto), shoppingCartController.create);
router.get('/:id', validateParams(ParamsDto), shoppingCartController.findOne);
router.get('/', validateQuery(SearchDto), shoppingCartController.find);
router.delete('/:id', validateParams(SearchDto), shoppingCartController.delete);
router.patch(
	'/:id',
	validateParams(ParamsDto),
	validateBody(ShoppingCartDto),
	shoppingCartController.update
);
export default router;
