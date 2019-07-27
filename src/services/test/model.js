import mongoose from 'mongoose';

const { Schema } = mongoose;
const Test = new Schema({
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
  description: String,
});

export default mongoose.model('Test', Test);
