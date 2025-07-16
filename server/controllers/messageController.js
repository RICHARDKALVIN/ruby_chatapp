// server/controllers/messageController.js
import Message from '../models/Message.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Middleware to verify JWT (used inside each controller)
const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('No token provided');

  const token = authHeader.split(' ')[1]; // Bearer <token>
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

// 💬 Get all messages
export const getMessages = async (req, res) => {
  try {
    const user = verifyToken(req);

    const messages = await Message.find()
      .sort({ timestamp: 1 })
      .populate('sender', 'username'); // include sender username

    res.status(200).json(messages);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

// 📤 Send a message
export const sendMessage = async (req, res) => {
  const { content } = req.body;

  try {
    const user = verifyToken(req);

    const sender = await User.findById(user.id);
    if (!sender) return res.status(404).json({ message: 'User not found' });

    const newMessage = await Message.create({
      sender: sender._id,
      content,
    });

    res.status(201).json({
      message: 'Message sent',
      newMessage: {
        content: newMessage.content,
        sender: sender.username,
        timestamp: newMessage.timestamp,
      },
    });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};
