const mongoose = require('mongoose');

const { Schema } = mongoose;
const Token = new Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Expired'],
  },
});

module.exports = mongoose.model('Token', Token);
