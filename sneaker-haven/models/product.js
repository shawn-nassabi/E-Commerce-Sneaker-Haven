import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  userID: {
    type: String,
    required: true,
  },
  reviews: [],
});
const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
