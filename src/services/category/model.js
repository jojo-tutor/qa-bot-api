const mongoose = require('mongoose');

const { Schema } = mongoose;
const Category = new Schema({
  description: String,
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Category', Category);
