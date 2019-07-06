const mongoose = require('mongoose');

const { Schema } = mongoose;
const Test = new Schema({
  description: String,
  name: {
    type: String,
    required: true,
  },
  time_limit: { // in seconds
    type: Number,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
    },
  ],
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  difficulty: {
    type: String,
    enum: ['Easy', 'Intermediate', 'Hard'],
  },
});

module.exports = mongoose.model('Test', Test);
