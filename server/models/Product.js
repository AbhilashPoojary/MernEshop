const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    price: {
      type: Number,
      require: true,
      min: 0,
    },
    imgUrl: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
