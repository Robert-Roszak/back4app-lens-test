import { Router } from 'express';
import { addOrder, getOrder } from '../controllers/orders.controller';
const router = Router();

router.post('/orders', addOrder);
router.get('/orders/:id', getOrder);

export default router;