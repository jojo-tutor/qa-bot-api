import mongoose from 'mongoose';

const { Schema } = mongoose;
const Result = new Schema({
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  test: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Test',
  },
  status: {
    type: String,
    enum: ['On-going', 'Completed'],
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  questions_answered: Number,
  ellapsed_time: String, // in seconds
  completed_date: Date,
  score: Number,
  total: Number,
  passing_percentage: Number, // in percent
  notes: String,
});

export default mongoose.model('Result', Result);
