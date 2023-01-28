const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    items: [
      {
        productId: {
          type: String,
        },
        productImg: {
          type: String,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
        },
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
    },
    date_added: {
      type: Date,
      default: Date.now,
    },
    address: {
      recipient_name: String,
      address_line1: String,
      address_line2: String,
      state: String,
      postal_code: Number,
      city: String,
      country: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
