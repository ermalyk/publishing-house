import { Router } from 'express';
import { sendMessage, listMessages } from '../controllers/contactController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', sendMessage);
router.get('/', requireAuth, requireAdmin, listMessages);

export default router;
