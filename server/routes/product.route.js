import express from "express";
import { query } from "express-validator";
import { createProduct, updateProduct, getAllProducts, getSuggestedProducts, deleteProduct } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { validateProduct } from "../middlewares/product.middleware.js";
import { upload } from "../middlewares/multer/upload.middleware.js";

const productRouter = express.Router();

productRouter.get('/', authMiddleware, getAllProducts);

productRouter.post(
  "/create",
  authMiddleware,
  upload.array("images", 5),
  validateProduct,
  createProduct
);

productRouter.put(
  "/update/:id",
  authMiddleware,
  upload.array("images", 5),
  validateProduct,
  updateProduct
);

productRouter.get('/get-suggestions',[
  query('input').isString().isLength({ min: 1 }).withMessage("Input query must have at least 1 character"),
], authMiddleware, getSuggestedProducts);

productRouter.delete('/:id', authMiddleware, deleteProduct);

export default productRouter;