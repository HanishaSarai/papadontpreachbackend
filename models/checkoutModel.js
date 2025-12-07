// models/checkoutModel.js
const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  user: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    company: { type: String },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cardDetails: {
      cardNumber: String,
      cardExpiry: String,
      cardCVV: String,
    }
  },
  cartItems: [{ type: Object, required: true }],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  codCharge: { type: Number, default: 0 },
  finalTotal: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Checkout", checkoutSchema);
