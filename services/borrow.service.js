import {Book} from '../models/book.model.js'; // Import the Book model
import Borrow from '../models/borrow.model.js'; // Import the Borrow model

export class BorrowService {
  /**
   * Borrow a book
   * @param {String} userId - The ID of the user borrowing the book.
   * @param {String} bookId - The ID of the book to be borrowed.
   */
  async borrowBook(userId, bookId) {
    // Check if the book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.quantity < 1) {
      throw new Error('Book is not available');
    }

    // Record the borrow transaction
    const borrow = new Borrow({
      userId,
      bookId,
      borrowDate: new Date(),
      status: 'borrowed',
    });
    await borrow.save();

    // Update the book's quantity
    book.quantity -= 1;
    await book.save();

    return borrow;
  }

  /**
   * Return a book
   * @param {String} userId - The ID of the user returning the book.
   * @param {String} bookId - The ID of the book being returned.
   */
  async returnBook(userId, bookId) {
    // Check if the borrow record exists
    const borrow = await Borrow.findOne({
      userId,
      bookId,
      status: 'borrowed',
    });

    if (!borrow) {
      throw new Error('No record of this book being borrowed by this user');
    }

    // Update the borrow status to "returned"
    borrow.status = 'returned';
    borrow.returnDate = new Date();
    await borrow.save();

    // Update the book's quantity
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    book.quantity += 1;
    await book.save();

    return borrow;
  }

  /**
   * Get all borrowed books
   * @param {String} userId - (Optional) The ID of the user. If provided, returns only their borrowed books.
   * @param {String} role - The role of the user (admin or guest). Admins can see all borrowed books.
   */
  async getBorrowedBooks(userId, role) {
    const query = role === 'admin' ? {} : { userId };
    const borrowedBooks = await Borrow.find(query).populate('bookId', 'title author genre');
    return borrowedBooks;
  }
}

// Exporting an instance of the BorrowService class

