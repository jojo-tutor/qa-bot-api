import mongoose from 'mongoose';

const { Schema } = mongoose;
const Token = new Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Expired'],
  },
});

export default mongoose.model('Token', Token);
