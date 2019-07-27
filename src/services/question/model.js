import mongoose from 'mongoose';

const { Schema } = mongoose;
const Question = new Schema({
  description: String,
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Question', Question);
