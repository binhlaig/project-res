import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productname: String,
  procode: String,
  description: String,
  media: [String],
  category: String,
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  sizes: [String],
  colors: [String],
  price:String,
  expense:String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
