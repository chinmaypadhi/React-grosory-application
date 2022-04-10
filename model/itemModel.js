const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An item must have a Name"],
    trim: true,
    unique: true,
    maxlength: [100, "An item name must have less or equal than 40 characters"],
    minlength: [5, "An item name must have more or equal than 5 characters"],
  },
  price: {
    type: String,
    required: [true, "An item must have price "],
  },

  description: {
    type: String,
    required: true,
  },

  countInStock: {
    type: Number,
    required: true,
  },

  imageCover: {
    type: String,
    required: [true, "An item must have a cover image"],
  },
  category: {
    type: String,
    enum: ["grocery", "vegetables"],
    default: "grocery",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
