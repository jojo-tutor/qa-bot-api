const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;
const User = new Schema({
  first_name: String,
  last_name: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  role: {
    type: String,
    default: 'Guest',
    enum: ['Guest', 'Candidate', 'Company_Admin'],
  },
  status: {
    type: String,
    default: 'Unverified',
    enum: ['Active', 'Inactive', 'Unverified'],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    dropDups: true,
    unique: true,
    required: true,
    validate: {
      validator(email) {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(String(email).toLowerCase());
      },
      message: ({ value }) => `${value} is not a valid email!`,
    },
  },
});

User.pre('find', function preFind() {
  this.select('-password');
});

const CompanyUser = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
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

// plugins
User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);
module.exports.Password = mongoose.model('Password', Password);
module.exports.CompanyUser = mongoose.model('CompanyUser', CompanyUser);
