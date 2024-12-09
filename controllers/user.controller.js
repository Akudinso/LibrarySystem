import { UserService } from '../services/user.service.js';

export class UserController {
  // User registration
  static async registerUser(req, res, next) {
    try {
      const {...userData} =req.body
      const user = await UserService.registerUser(userData);
      return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // User login
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.loginUser(email, password);
      return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}