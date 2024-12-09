import { BookService } from "../services/book.service.js";

class BookController {
    static async createBook(req, res) {
        try {
            console.log("request body", req.body);
            const newBook = await BookService.createBook(req.body);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    static async getAllbooks (req, res){
        try {
            const books = await BookService.getAllbooks(req.query);
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // static async getBookById (req, res){
    //     try {
    //         const book = await BookService.getBookById(req.params.bookId);
    //         if (!book) {
    //             return res.status(404).json({ error: 'Book not found' })
    //         }
    //         res.status(200).json(book);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }


    static async getBookById(req, res) {
        try {
            const { bookId } = req.params; // Extract bookId
            // console.log('Fetching book with ID:', bookId); // Debugging log
    
            if (!bookId) {
                return res.status(400).json({ error: 'Book ID is required' });
            }
    
            const book = await BookService.getBookById(bookId);
    
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
    
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    static async updateBook (req, res){
        try {
            const updatedBook = await BookService.updateBook(req.params.bookId, req.body);
            if (!updatedBook) {
                return res.status(404).json({ error: 'Book not found' })
            }
            res.status(200).json(updatedBook);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteBook(req, res) {
        try {
            const deleteBook = await BookService.deleteBook(req.params.bookId);
            if (!deleteBook) {
                return res.status(404).json({ error: 'Book not found' })
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}


export default BookController;


