import { Router } from 'express';
import order from '@src/routes/api/order';
import cart from '@src/routes/api/cart';
import {
	ensureAuthenticated,
	verifyRoles,
} from '@middleware/ensureAuthenticated';
import { Role } from '@common/enums/role.enum';

const router = Router();

router.use('/', order);
router.use(
	'/cart',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	cart
);

export default router;
