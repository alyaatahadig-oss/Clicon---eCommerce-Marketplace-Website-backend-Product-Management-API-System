const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"], trim: true },
    description: { type: String, required: [true, "Product description is required"] },
    price: { type: Number, required: [true, "Product price is required"], default: 0 },
    image: { type: String, default: "/uploads/default.png" },
    // خليناها categoryId عشان تطابق الـ Controller اللي عندك
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    countInStock: { type: Number, required: true, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);