// const user = require("../models/user");
// login part
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res, next) => {
  try {
    const { name, password, email, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }
    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res.status(409).json({ errorMessage: "user already exits" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name,
      email,
      password: hashedpassword,
      mobile,
    });

    await userData.save();

    res.json({ message: "user registerd sucessfully" });
  } catch (error) {
   next(error)
  }
};

const loginuser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }
    const userdetails = await User.findOne({ email: email });
    if (!userdetails) {
      return res.status(409).json({ errorMessage: "user does not exits" });
    }

    const ispasswordmatched = await bcrypt.compare(
      password,
      userdetails.password
    );

    if (!ispasswordmatched) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: userdetails._id }, process.env.SECRET_KEY, {expiresIn:"60h"});

    res.json({
      message: "User logged in",
      token : token,
      name : userdetails.name,
    });
  } catch (error) {
    next(error)
  }
};
 

module.exports = {
  registerUser,
  loginuser,
};
