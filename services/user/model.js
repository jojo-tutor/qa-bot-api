const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = new Schema({
  first_name: String,
  last_name: String,
  password: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'Unverified'],
  },
  email: {
    type: String,
    validate: {
      validator(email) {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(String(email).toLowerCase());
      },
      message: ({ value }) => `${value} is not a valid email!`,
    },
    required: [true, 'Email is required'],
  },
});

const Password = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', User);
module.exports.Password = mongoose.model('Password', Password);
