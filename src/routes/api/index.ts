import { Router } from 'express';
import order from '@src/routes/api/order';
import cart from '@src/routes/api/cart';
const router = Router();

router.use('/order', order);
router.use('/cart', cart);

export default router;
