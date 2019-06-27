const mongoose = require('mongoose');

const { Schema } = mongoose;
const Question = new Schema({
  id: Schema.ObjectId,
  question: String,
  answer: String,
  tags: Array,
});

module.exports = Question;
