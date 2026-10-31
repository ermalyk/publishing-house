import { Router } from 'express';
import {
  createOrder,
  listMyOrders,
  listAllOrders,
  updateOrderStatus,
} from '../controllers/ordersController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, createOrder);
router.get('/mine', requireAuth, listMyOrders);
router.get('/', requireAuth, requireAdmin, listAllOrders);
router.put('/:id/status', requireAuth, requireAdmin, updateOrderStatus);

export default router;
