import { Router } from 'express';
import items from '@src/routes/api/cart/items';
import shopping from '@src/routes/api/cart/shopping';

const router = Router();

router.use('/items', items);
router.use('/shopping', shopping);

export default router;
