import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  userName: { type: String },
  rating: { type: String },
  review: { type: String },
});

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
