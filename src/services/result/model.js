const mongoose = require('mongoose');

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
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  status: {
    type: String,
    enum: ['On-going', 'Completed'],
  },
  questions_answered: Number,
  ellapsed_time: String, // in seconds
  completed_date: Date,
  score: Number,
  total: Number,
  passing_percentage: Number, // in percent
  notes: String,
});

module.exports = mongoose.model('Result', Result);
