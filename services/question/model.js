const mongoose = require('mongoose');

const { Schema } = mongoose;
const Question = new Schema({
  question: String,
  answer: String,
});

module.exports = mongoose.model('Question', Question);
