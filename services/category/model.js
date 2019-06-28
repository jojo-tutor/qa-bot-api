const mongoose = require('mongoose');

const { Schema } = mongoose;
const Category = new Schema({
  id: Schema.ObjectId,
  name: String,
  description: String,
});

module.exports = mongoose.model('Category', Category);
