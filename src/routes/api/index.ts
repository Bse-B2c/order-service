import { Router } from 'express';
import orderDetails from '@src/routes/api/orderDetails';

const router = Router();

router.use('/api/orderdetails', orderDetails);

export default router;
