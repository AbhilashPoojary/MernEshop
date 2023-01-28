const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createError } = require("../error");

const allUsers = async (req, res, next) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const user = await User.findOne({ _id: userId });
    console.log(user.isAdmin);
    if (!user) return next(createError(404, "user not found"));
    if (!user.isAdmin)
      return next(createError(400, "only admin can req for all the orders"));
    const allUsers = await User.find({});
    console.log(allUsers);
    return res.status(200).json(allUsers);
  } catch (error) {
    next(createError(error));
  }
};

module.exports = { allUsers };
