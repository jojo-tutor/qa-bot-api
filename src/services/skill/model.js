import mongoose from 'mongoose';

const { Schema } = mongoose;
const Skill = new Schema({
  description: String,
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Skill', Skill);
