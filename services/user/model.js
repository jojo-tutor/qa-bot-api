const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  first_name: String,
  last_name: {
    type: String,
    required: true,
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
  role: {
    type: String,
    enum: ['company_admin', 'user'],
  },
});

module.exports = mongoose.model('User', User);
