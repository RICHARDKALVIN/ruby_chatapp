// server/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config(); // 👈 load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

// 👤 Register
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already taken' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

export const verifyUser = (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
  
      res.status(200).json({ username: decoded.username }); // can send more info if needed
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

  console.log('JWT_SECRET:', JWT_SECRET);

// 🔐 Login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('🔐 Login attempt for:', username);

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ message: 'Login successful', token, username: user.username });
  } catch (err) {
    console.error('❌ Login error:', err); // ADD THIS
    return res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

