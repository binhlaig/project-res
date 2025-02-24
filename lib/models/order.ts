import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerClerkId: String,
  username:String,
  cart:{
    type: Array,
    default: []
  },
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;