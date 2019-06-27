const mongoose = require('mongoose');

const { Schema } = mongoose;
const Company = new Schema({
  id: Schema.ObjectId,
  name: String,
  email: String,
});

module.exports = Company;
