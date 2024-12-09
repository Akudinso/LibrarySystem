import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js';
import bookRoutes from './routes/book.route.js';
import borrowRoutes from './routes/borrow.route.js';
dotenv.config();


const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
const port = process.env.PORT||4000;

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);



mongoose.connect(process.env.DATABASE_URL)
  .then(()=> console.log("mongoDB connected"))
  .catch((err)=> console.log("mongoDB connection error:", err));


app.listen(port, ()=>{
  console.log(`server is running on port ${port}`);
})



