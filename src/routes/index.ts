import { Router } from 'express';
import api from '@src/routes/api';

const router = Router();

router.use('/api/order', api);

export { router };
