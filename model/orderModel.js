const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  productsName: {
    type: Array,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
