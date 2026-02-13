import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrderStatus, cancelOrder } from './order.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.put('/:id/status', authorize('admin'), updateOrderStatus);

export default router;
