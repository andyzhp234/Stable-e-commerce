import mongoose from "mongoose";

const reviewModel = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
})


const Review = mongoose.model('Review', reviewModel)
export default Review