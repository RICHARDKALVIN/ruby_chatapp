import express from 'express';
import { registerUser, loginUser, verifyUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
console.log('📡 POST /login route initialized');

router.post('/login', loginUser);

// ✅ Add verify route
router.get('/verify', verifyUser);

export default router;
