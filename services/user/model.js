const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = new Schema({
  id: Schema.ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  role: String,
});

module.exports = mongoose.model('User', User);
