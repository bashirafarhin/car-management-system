import UserModel from "../database/models/user.model.js";
import { validationResult } from "express-validator";
import BlacklistTokenModel from "../database/models/blacklistToken.model.js";
import env from "dotenv";
env.config();

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //return error one by one until error array is empty that is no error
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered." });
    }
    const hashedPassword = await UserModel.hashPassword(password);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = user.generateAuthToken();
    user.password = undefined;
    return res.status(201).json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not registered." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    res.clearCookie("token");
    await BlacklistTokenModel.create({ token });
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlacklistTokenModel.create({ token });
    await UserModel.findByIdAndDelete({ _id: req.user._id });
    return res.status(200).json({ message: "Account Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    return res.status(200).json({ email : req.user.email, username : req.user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};