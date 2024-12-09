import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
const { JWT_SECRET } = dotenv.config().parsed;



// Service for user registration
export class UserService {
  static async registerUser(userData) {
    // Check if the user already exists
    
    const existingUser = await User.findOne(  {email: userData.email});
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();
    return newUser;
  }

  // Service for user login
  static async loginUser(email, password) {
    // Find user by email
    const user = await User.findOne( {email:email} );
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });
    return { user, token };
  }
}