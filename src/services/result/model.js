const mongoose = require('mongoose');

const { Schema } = mongoose;
const Result = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
  },
  status: {
    type: String,
    enum: ['Invited', 'On-going', 'Completed'],
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
