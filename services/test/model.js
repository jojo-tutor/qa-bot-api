const mongoose = require('mongoose');

const { Schema } = mongoose;
const Test = new Schema({
  name: String,
  description: String,
  categories: Array,
  skills: Array,
  questions: Array,
  difficulty: String,
  time_limit: Number, // in seconds
});

module.exports = mongoose.model('Test', Test);
