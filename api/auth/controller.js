const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPass = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.SECRECT_KEY, {
    expiresIn: "60hr",
  });

  return token;
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    req.body.password = await hashPass(req.body.password);
    const user = await User.create(req.body);
    const token = generateToken(user);
    return res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    return res.status(200).json({ username: req.user.username });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, register, login, getMyProfile };
