import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  barcode: String,
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
const Products =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Products;