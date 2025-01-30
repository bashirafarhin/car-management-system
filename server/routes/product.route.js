import express from "express";
import { body, param, query } from "express-validator";
import { createProduct, updateProduct, getAllProducts, getSuggestedProducts, deleteProduct } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"

const productRouter = express.Router();

productRouter.get('/', authMiddleware, getAllProducts);

// i will be validating product in a middleware after creating frontend
productRouter.post(
  "/create",
  [
    body("title")
      .notEmpty().withMessage("Title is required"),
      
    body("description")
      .notEmpty().withMessage("Description is required")
      .isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),

    body("images")
      .optional()
      .isArray().withMessage("Images must be an array")
      .custom((value) => value.length <= 10).withMessage("You can upload up to 10 images only"),

    body("carType")
      .notEmpty().withMessage("Car type is required")
      .isIn(["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Truck", "Van"])
      .withMessage("Car type is invalid"),

    body("company")
      .notEmpty().withMessage("Company name is required"),

    body("dealer")
      .notEmpty().withMessage("Dealer name is required"),
  ],
  authMiddleware,
  createProduct
);

productRouter.put(
  "/update/:id",
  [
    param("id").isMongoId().withMessage("Invalid Product ID"),

    body("title")
      .notEmpty().withMessage("Title cannot be empty"),

    body("description")
      .notEmpty().withMessage("Description cannot be empty")
      .isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),

    body("images")
      .optional()
      .isArray().withMessage("Images must be an array")
      .custom((value) => value.length <= 10).withMessage("You can upload up to 10 images only"),

    body("carType")
      .notEmpty().withMessage("Car type is required")
      .isIn(["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Truck", "Van"])
      .withMessage("Invalid car type"),

    body("company")
      .notEmpty().withMessage("Company name is required"),

    body("dealer")
      .notEmpty().withMessage("Dealer name is required"),
  ],
  authMiddleware,
  updateProduct
);

productRouter.get('/get-suggestions',[
  query('input').isString().isLength({ min: 1 }).withMessage("Input query must have at least 1 character"),
], authMiddleware, getSuggestedProducts);

productRouter.delete('/:id', authMiddleware, deleteProduct);

export default productRouter;