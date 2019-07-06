const mongoose = require('mongoose');

const { Schema } = mongoose;
const Skill = new Schema({
  description: String,
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Skill', Skill);
