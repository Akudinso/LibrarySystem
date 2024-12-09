import express from 'express';
import BookController from '../controllers/book.controller.js';
import { updateBookValidationSchema, validate } from '../middlewares/validate.middleware.js';
import { bookValidationSchema } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = express.Router();

// Add a book (admin-only)
router.post('/books', authMiddleware, roleMiddleware('admin'), validate(bookValidationSchema), BookController.createBook);

// Get all books
router.get('/books', BookController.getAllbooks);

// Get book by ID
// router.get('/books/:id', BookController.getBookById);
router.get('/books/:bookId',  BookController.getBookById);


// Update a book (admin-only)
router.put(
    '/books/:id',
    authMiddleware,
    roleMiddleware('admin'),
    validate(updateBookValidationSchema),
    BookController.updateBook
);

// Delete a book (admin-only)
router.delete(
    '/books/:id',
    authMiddleware,
    roleMiddleware('admin'),
    BookController.deleteBook
);

export default router;
