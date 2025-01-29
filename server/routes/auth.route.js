import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, logoutUser, deleteUserAccount, getUserProfile } from '../controllers/auth.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { get } from "mongoose";

const authRouter = express.Router();

authRouter.post('/register',[
    body("username").notEmpty().withMessage("Name is required"),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters.')
], registerUser);

authRouter.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters.')
], loginUser);

authRouter.get('/logout', authMiddleware , logoutUser);
authRouter.delete('/delete-account', authMiddleware, deleteUserAccount);
authRouter.get('/profile', authMiddleware, getUserProfile);

export default authRouter;