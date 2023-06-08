import { Router } from 'express';
import { getAll, getOneProduct } from '../controllers/products.controller';
const router = Router();

router.get('/products', getAll);
router.get('/products/:id', getOneProduct);

export default router;