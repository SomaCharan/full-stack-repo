const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },

  razorpay_signature: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },

  price: { type: Number, required: true },

  // mongodb id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // uuid user id
  userreference: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
