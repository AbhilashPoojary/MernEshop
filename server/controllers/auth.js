const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createError } = require("../error");

const reqister = async (req, res, next) => {
  const { username, email, password, profilePicture } = req.body;
  console.log(username, email, password, profilePicture);
  const lowerEmail = email.toLowerCase();
  try {
    const oldUser = await User.findOne({ email: lowerEmail });
    if (oldUser) {
      return next(createError(404, "User already exists"));
    }
    if (!username || !email || !password || !profilePicture) {
      return next(createError(404, "Please enter all the fields"));
    }
    //generate a password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user
    const newUser = new User({
      username,
      email: lowerEmail,
      profilePicture,
      password: hashedPassword,
    });
    console.log(newUser);
    //save user and send response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    //check for all fields
    if (!email || !password)
      return next(createError(404, "Please enter all the fields"));
    //check for user
    const user = await User.findOne({ email: lowerEmail }).select("+password");
    console.log(user);
    if (!user) return next(createError(404, "User not found"));
    //validate password
    const validpswd = await bcrypt.compare(password, user.password);
    if (!validpswd) return next(createError(404, "Password is incorrect"));
    res.status(200).json(user);
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

module.exports = { reqister, login };
