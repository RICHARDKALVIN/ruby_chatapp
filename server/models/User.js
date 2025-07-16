// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
