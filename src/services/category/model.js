import mongoose from 'mongoose';

const { Schema } = mongoose;
const Category = new Schema({
  description: String,
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Category', Category);
