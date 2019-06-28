const mongoose = require('mongoose');

const { Schema } = mongoose;
const Category = new Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model('Category', Category);
