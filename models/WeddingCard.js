const mongoose = require("mongoose");

const weddingCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    size: String,
    paper: String,
    images: [String], // image paths
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeddingCard", weddingCardSchema);
