import ProductModel from "../database/models/product.model.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import env from "dotenv";
env.config();

export const getAllProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  try {
    const userId = req.user._id;
    const products = await ProductModel.find({ userId });
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  try {
    const { title, description, images, tags, carType, company, dealer } =
      req.body;
    const userId = req.user._id;
    const newProduct = new ProductModel({
      title,
      description,
      images,
      tags,
      carType,
      company,
      dealer,
      userId: userId,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id;
    const mongoProductId = new mongoose.Types.ObjectId(id);
    const product = await ProductModel.findOne({ _id: mongoProductId, userId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    Object.assign(product, updates);
    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getSuggestedProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  try {
    const { input } = req.query;
    const userId = req.user._id;
    const products = await ProductModel.searchProducts(input, userId);
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const product = await ProductModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id), userId });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
