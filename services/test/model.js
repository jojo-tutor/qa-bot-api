const mongoose = require('mongoose');

const { Schema } = mongoose;
const Test = new Schema({
  id: Schema.ObjectId,
  questions: Array,
  skills: Array,
  difficulty: String,
});

module.exports = mongoose.model('Test', Test);
