import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['borrowed', 'returned'],
      default: 'borrowed',
    },
  });
  
  const Borrow = mongoose.model('Borrow', borrowSchema);
  
  export default Borrow;
  