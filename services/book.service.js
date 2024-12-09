import { Book } from '../models/book.model.js'

export class BookService {
    static async createBook(data) {
        return await Book.create(data)
    }

    static async getAllbooks(query) {
        const filters = {};

        if (query.search) {
            filters.title = { $regex: query.search, $options: 'i' };
        }

        if (query.author) {
            filters.author = query.author;
        }

        if (query.minYear || query.maxYear) {
            filters.publicationYear = {
                $gte: query.minYear || 0,
                $lte: query.maxYear || Infinity,
            };
        }

        return await Book.find(filters);
    }

    static async getBookById(bookId) {
        try {
            // console.log('Fetching book with ID:', bookId);
            const book = await Book.findById(bookId)
            if (!book) {
                throw new Error('Book not Found');
            }
            return book;
        } catch (err) {
            throw new Error('Error fetching book: ' + err.message)
        }

    }

    // static async updateBook(bookId, updateData) {

    //     try {
    //         const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true, runValidators: true });
    //         if (!updatedBook) {
    //             throw new Error('Book not found');
    //         }
    //         return updatedBook;

    //     } catch (error) {
    //         throw new Error('Error updating book:' + error.message);
    //     }

    // }


    static async updateBook(bookId, updateData) {
        try {
            const updatedBook = await Book.findByIdAndUpdate(
                bookId,
                { $set: updateData }, // Update only provided fields
                { new: true, runValidators: true } // Return updated document, enforce validators
            );
            if (!updatedBook) {
                throw new Error('Book not found');
            }
            return updatedBook;
        } catch (error) {
            throw new Error('Error updating book: ' + error.message);
        }
    }




    static async deleteBook(bookId) {
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            throw new Error('Book not found');
        }
        return deletedBook;
    }
}


