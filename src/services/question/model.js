const mongoose = require('mongoose');

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

module.exports = mongoose.model('Question', Question);
