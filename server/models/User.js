const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      max: 50,
      default: "",
    },
    profilePicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    coverPicture: {
      type: String,
      default:
        "https://murraysinteriors.com.au/wp-content/uploads/2018/09/dummy-banner-768x344.jpg",
    },
    phoneNo: {
      type: Number,
    },
    education: {
      type: String,
    },
    city: {
      type: String,
    },
    town: {
      type: String,
    },
    relationStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
