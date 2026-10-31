import { Router } from 'express';
import {
  listBooks,
  getBookBySlug,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/booksController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listBooks);
router.get('/:slug', getBookBySlug);
router.post('/', requireAuth, requireAdmin, createBook);
router.put('/:id', requireAuth, requireAdmin, updateBook);
router.delete('/:id', requireAuth, requireAdmin, deleteBook);

export default router;
