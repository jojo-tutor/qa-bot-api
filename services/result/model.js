const mongoose = require('mongoose');

const { Schema } = mongoose;
const Result = new Schema({
  user_id: String,
  company_id: String,
  test_id: String,
  questions_answered: Number,
  ellapsed_time: String, // in seconds
  completed_date: Date,
  status: String,
  score: Number,
  total: Number,
  passing_percentage: Number,
  notes: String,
});

module.exports = mongoose.model('Result', Result);
