const mongoose = require('mongoose');

const { Schema } = mongoose;
const Test = new Schema({
  id: Schema.ObjectId,
  name: String,
  description: String,
  categories: Array,
  skills: Array,
  questions: Array,
  difficulty: String,
});

module.exports = mongoose.model('Test', Test);
