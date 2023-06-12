import { Router } from 'express';
import details from '@src/routes/api/order/details';
import items from '@src/routes/api/order/items';
import payment from '@src/routes/api/order/payment';

const router = Router();

router.use('/details', details);
router.use('/items', items);
router.use('/payment', payment);

export default router;
