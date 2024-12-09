import express from 'express';
import { BorrowController } from '../controllers/borrow.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Borrow a book
router.post('/borrow', authMiddleware, BorrowController.borrowBook);

// Return a book
router.post('/return', authMiddleware, BorrowController.returnBook);

export default router;
