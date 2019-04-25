const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    UPC14: String,
    UPC12: String,
    Brand: String,
    ProductName: String,
    Category: String,
    SubCategory: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductSchema, "Products");
