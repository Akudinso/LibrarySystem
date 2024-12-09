import {BorrowService} from '../services/borrow.service.js'; // Import the instance of BorrowService

export const BorrowController = {
  borrowBook: async (req, res) => {
    try {
      const borrow = await BorrowService.borrowBook(req.user.id, req.body.bookId);
      res.status(201).json(borrow);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  returnBook: async (req, res) => {
    try {
      const returnInfo = await BorrowService.returnBook(req.user.id, req.body.bookId);
      res.status(200).json(returnInfo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getBorrowedBooks: async (req, res) => {
    try {
      const borrowedBooks = await BorrowService.getBorrowedBooks(req.user.id, req.user.role);
      res.status(200).json(borrowedBooks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
