const mongoose = require('mongoose');

const { Schema } = mongoose;
const Company = new Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model('Company', Company);
